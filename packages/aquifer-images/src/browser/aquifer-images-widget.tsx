import * as React from 'react';
import { inject, postConstruct } from "@theia/core/shared/inversify";
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from "@theia/core";
import { Message } from "@theia/core/lib/browser/widgets/widget";
import { EditorManager } from '@theia/editor/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { CommandRegistry } from '@theia/core/lib/common/command';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { Widget } from '@theia/core/lib/browser/widgets/widget';
import ImageList from '../components/ImageList';
import { EnvConfigService } from './env-config-service';

// Custom widget for displaying images directly in the editor
export class ImageViewerWidget extends Widget {
    constructor(
        id: string,
        private readonly imageUrl: string,
        private readonly bookCode: string
    ) {
        super();
        this.id = id;
        this.title.label = `Image - ${bookCode}`;
        this.title.caption = `Image from ${bookCode}`;
        this.title.closable = true;
        this.addClass('aquifer-image-viewer');
        this.node.style.overflow = 'auto';
        this.node.style.padding = '0';
        this.update();
    }

    protected onAfterAttach(): void {
        // Create image element
        const img = document.createElement('img');
        img.src = this.imageUrl;
        img.alt = `Biblical image from ${this.bookCode}`;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100vh';
        img.style.objectFit = 'contain';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        
        // Clear any existing content
        while (this.node.firstChild) {
            this.node.removeChild(this.node.firstChild);
        }
        
        // Add image to widget
        this.node.appendChild(img);
    }
}

export class AquiferWidget extends ReactWidget {
    static ID = "AquiferWidget";
    static LABEL = "Aquifer Images";

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @inject(EnvConfigService)
    protected readonly envConfigService!: EnvConfigService;
    
    @inject(EditorManager)
    protected readonly editorManager!: EditorManager;
    
    @inject(WorkspaceService)
    protected readonly workspaceService!: WorkspaceService;
    
    @inject(FileService)
    protected readonly fileSystem!: FileService;
    
    @inject(CommandRegistry)
    protected readonly commandRegistry!: CommandRegistry;
    
    @inject(WidgetManager)
    protected readonly widgetManager!: WidgetManager;
    
    @inject(ApplicationShell)
    protected readonly shell!: ApplicationShell;
    
    // Configuration state
    protected apiKey: string = '';
    protected apiUrl: string = '';
    protected configReady: boolean = false;
    protected configError: string | null = null;
    protected isLoading: boolean = true;

    @postConstruct()
    protected init(): void {
        // Basic widget setup
        this.id = AquiferWidget.ID;
        this.title.label = AquiferWidget.LABEL;
        this.title.caption = AquiferWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize';
        
        // Start loading the configuration
        this.loadConfig();
    }
    
    // Load configuration asynchronously
    protected async loadConfig(): Promise<void> {
        try {
            // Load API key and URL
            this.apiKey = await this.envConfigService.getApiKey();
            this.apiUrl = await this.envConfigService.getApiUrl();
            
            console.log('Configuration loaded successfully');
            console.log('API URL:', this.apiUrl);
            console.log('API Key available:', !!this.apiKey);
            
            // Mark as ready
            this.configReady = true;
            this.isLoading = false;
            this.update();
        } catch (error) {
            console.error('Error loading configuration:', error);
            this.configError = 'Failed to load API configuration';
            this.isLoading = false;
            this.update();
        }
    }

    // Method to open an image directly in the editor
    async openImageInEditor(imageUrl: string, bookCode: string): Promise<void> {
        try {
            // Create a unique ID for the widget
            const id = `aquifer-image-${bookCode}-${Date.now()}`;
            
            // Create a new widget to display the image
            const imageWidget = new ImageViewerWidget(id, imageUrl, bookCode);
            
            // Add the widget to the shell
            this.shell.addWidget(imageWidget, { area: 'main' });
            
            // Activate the widget
            this.shell.activateWidget(id);
            
            this.messageService.info(`Opened image from ${bookCode}`);            
        } catch (error) {
            console.error('Error opening image in editor:', error);
            this.messageService.error(`Failed to open image: ${error}`);            
        }
    }
    
    render(): React.ReactElement {
        // If still loading configuration
        if (this.isLoading) {
            return (
                <div id='aquifer-container'>
                    <AlertMessage type='INFO' header='Loading configuration...' />
                </div>
            );
        }
        
        // If there was a configuration error
        if (this.configError) {
            return (
                <div id='aquifer-container'>
                    <AlertMessage type='ERROR' header={`Error: ${this.configError}`} />
                </div>
            );
        }
        
        return (
            <div id='aquifer-container'>
                <h2>Aquifer Bible Images</h2>
                <p>Click on an image to open it in the editor</p>
                <ImageList 
                    apiKey={this.apiKey}
                    apiUrl={this.apiUrl}
                    isConfigReady={this.configReady}
                    onImageClick={(imageUrl, bookCode) => this.openImageInEditor(imageUrl, bookCode)}
                />
            </div>
        );
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: Widget Widget Successfully Created!');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const htmlElement = document.getElementById('displayMessageButton');
        if (htmlElement) {
            htmlElement.focus();
        }
    }
}