
import { injectable, inject } from '@theia/core/shared/inversify';
import { OpenHandler, OpenerOptions, WidgetManager, ApplicationShell } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
// import { MaybePromise } from '@theia/core/lib/common/types';
import { CustomFileWidget } from './custom-file-widget';

@injectable()
export class FileOpenHandler implements OpenHandler {
    readonly id = 'custom-file-open-handler';
    readonly label = 'Custom File Open Handler';

    @inject(WidgetManager)
    protected readonly widgetManager: WidgetManager;

    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    canHandle(uri: URI): number {
      return uri.path.ext.toLowerCase() === '.usfm' ? 500 : 0;
    }

    async open(uri: URI, options?: OpenerOptions): Promise<CustomFileWidget> {
        console.log('USFM File opened:', uri.toString());
        const widget = await this.widgetManager.getOrCreateWidget<CustomFileWidget>(CustomFileWidget.ID, {
            factoryId: CustomFileWidget.ID
        });
        if (widget instanceof CustomFileWidget) {
            await widget.setUri(uri);
        }
        if (!widget.isAttached) {
            this.shell.addWidget(widget, { area: 'main' });
        }
        this.shell.activateWidget(widget.id);
        return widget;
    }
}


// @injectable()
// export class FileOpenHandler implements OpenHandler {
//     readonly id = 'custom-file-open-handler';
//     readonly label = 'Custom File Open Handler';

//     @inject(WidgetManager)
//     protected readonly widgetManager: WidgetManager;

//     @inject(ApplicationShell)
//     protected readonly shell: ApplicationShell;

//     canHandle(uri: URI): number {
//         return uri.path.ext.toLowerCase() === '.usfm' ? 500 : 0;
//     }

//     async open(uri: URI, options?: OpenerOptions): Promise<CustomFileWidget> {
//         const widget = await this.widgetManager.getOrCreateWidget<CustomFileWidget>(CustomFileWidget.ID, {
//             factoryId: CustomFileWidget.ID,
//             created: async () => {
//                 const w = new CustomFileWidget();
//                 await w.setUri(uri);
//                 return w;
//             }
//         });

//         if (!widget.isAttached) {
//             this.shell.addWidget(widget, { area: 'main' });
//         }
//         this.shell.activateWidget(widget.id);
//         return widget;
//     }
// }