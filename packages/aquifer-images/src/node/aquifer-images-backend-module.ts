import { ContainerModule } from '@theia/core/shared/inversify';
import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core/lib/common/messaging';
import { EnvConfigBackendService } from './env-config-backend-service';
import { EnvConfigService, envConfigServicePath } from '../common/env-config-protocol';

export default new ContainerModule(bind => {
    bind(EnvConfigBackendService).toSelf().inSingletonScope();
    bind(EnvConfigService).toService(EnvConfigBackendService);
    
    bind(ConnectionHandler).toDynamicValue(ctx => 
        new JsonRpcConnectionHandler(envConfigServicePath, () => 
            ctx.container.get<EnvConfigService>(EnvConfigService)
        )
    ).inSingletonScope();
});
