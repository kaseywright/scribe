import * as React from 'react';
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from "@theia/core";
import { Message } from "@theia/core/lib/browser/widgets/widget";
import ImageList from '../components/ImageList';
import { EnvConfigService } from './env-config-service';

@injectable()
export class AquiferWidget extends ReactWidget {
    static ID = "AquiferWidget";
    static LABEL = "Aquifer Images";

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @inject(EnvConfigService)
    protected readonly envConfigService!: EnvConfigService;
    
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
        
        // Normal render
        const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;
        
        return (
            <div id='aquifer-container'>
                <AlertMessage type='INFO' header={header} />
                <button id='displayMessageButton' className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
                <ImageList 
                    apiKey={this.apiKey}
                    apiUrl={this.apiUrl}
                    isConfigReady={this.configReady}
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