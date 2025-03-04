import * as React from 'react';
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from "@theia/core";
import { Message } from "@theia/core/lib/browser/widgets/widget";
import ImageList from '../components/ImageList';

@injectable()
export class AquiferWidget extends ReactWidget {
    static ID = "AquiferWidget";
    static LABEL = "Aquifer Widget";

    @inject(MessageService)
    protected readonly messageService: MessageService;

    @postConstruct()
    protected init(): void {
        this.doInit();
    }

    protected async doInit(): Promise<void> {
        this.id = AquiferWidget.ID;
        this.title.label = AquiferWidget.LABEL;
        this.title.caption = AquiferWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize';
        this.update();
    }

    render(): React.ReactElement {
        const header = `This is a sample widget which simply calls the messageService
        in order to display an info message to end users.`;
        return <div id='aquifer-container'>
            <AlertMessage type='INFO' header={header} />
            <button id='displayMessageButton' className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
            <ImageList />
        </div>
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