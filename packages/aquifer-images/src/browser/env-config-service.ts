import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { EnvConfigService as EnvConfigServiceInterface, envConfigServicePath } from '../common/env-config-protocol';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging/ws-connection-provider';

@injectable()
export class EnvConfigService {
    private cachedConfig: Record<string, string> | undefined;
    
    @inject(WebSocketConnectionProvider)
    protected readonly wsConnectionProvider: WebSocketConnectionProvider;
    
    protected envConfigService: EnvConfigServiceInterface;
    
    @postConstruct()
    protected async init(): Promise<void> {
        this.envConfigService = this.createProxy();
        await this.loadEnvConfig();
    }
    
    protected createProxy(): EnvConfigServiceInterface {
        return this.wsConnectionProvider.createProxy<EnvConfigServiceInterface>(envConfigServicePath);
    }
    
    private async loadEnvConfig(): Promise<void> {
        try {
            console.log('Loading environment configuration from backend service...');
            this.cachedConfig = await this.envConfigService.getEnvConfig();
            console.log('Loaded environment configuration from backend service');
            
            // Log the keys we have (but not the values for security)
            const keys = Object.keys(this.cachedConfig || {});
            console.log('Available environment keys:', keys);
        } catch (error) {
            console.error('Error loading environment configuration:', error);
            this.cachedConfig = {
                AQUIFER_API_KEY: '',
                AQUIFER_API_URL: 'https://api.aquifer.bible'
            };
        }
    }

    async get(key: string): Promise<string | undefined> {
        if (!this.cachedConfig) {
            await this.loadEnvConfig();
        }
        return this.cachedConfig?.[key];
    }

    async getApiKey(): Promise<string> {
        const key = await this.get('AQUIFER_API_KEY');
        return key || '';
    }

    async getApiUrl(): Promise<string> {
        const url = await this.get('AQUIFER_API_URL');
        return url || 'https://api.aquifer.bible';
    }
}
