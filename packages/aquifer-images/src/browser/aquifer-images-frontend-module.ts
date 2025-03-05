/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from '@theia/core/shared/inversify';
import { AquiferContribution } from './aquifer-images-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { AquiferWidget } from './aquifer-images-widget';
import { EnvConfigService } from './env-config-service';


export default new ContainerModule(bind => {

    bindViewContribution(bind, AquiferContribution)
    bind(FrontendApplicationContribution).toService(AquiferContribution);
    bind(AquiferWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: AquiferWidget.ID,
        createWidget: () => ctx.container.get<AquiferWidget>(AquiferWidget),
    })).inSingletonScope();
    
    // Bind the environment config service
    bind(EnvConfigService).toSelf().inSingletonScope();
});
