/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from '@theia/core/shared/inversify';
import { AquiferContribution } from './aquifer-images-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { AquiferWidget } from './aquifer-images-widget';
import { EnvConfigService } from './env-config-service';

export default new ContainerModule(bind => {
    // Bind the environment config service first
    bind(EnvConfigService).toSelf().inSingletonScope();

    bindViewContribution(bind, AquiferContribution);
    bind(FrontendApplicationContribution).toService(AquiferContribution);
    
    // Bind the widget
    bind(AquiferWidget).toSelf();
    
    // Use a standard synchronous widget factory
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: AquiferWidget.ID,
        createWidget: () => ctx.container.get<AquiferWidget>(AquiferWidget)
    })).inSingletonScope();
});
