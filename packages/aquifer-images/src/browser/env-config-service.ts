import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { EnvConfigService as EnvConfigServiceInterface, envConfigServicePath } from '../common/env-config-protocol';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging/ws-connection-provider';
import { MessageService } from '@theia/core';

@injectable()
export class EnvConfigService {
    private cachedConfig: Record<string, string> | undefined;
    private configInitialized = false;
    private initPromise: Promise<void> | undefined;
    
    @inject(WebSocketConnectionProvider)
    protected readonly wsConnectionProvider: WebSocketConnectionProvider;
    
    @inject(MessageService)
    protected readonly messageService: MessageService;
    
    protected envConfigService: EnvConfigServiceInterface;
    
    @postConstruct()
    protected init(): void {
        // Create the proxy synchronously
        this.envConfigService = this.createProxy();
        
        // Start loading the config but don't wait for it
        this.initPromise = this.loadEnvConfig();
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
            
            this.configInitialized = true;
        } catch (error) {
            console.error('Error loading environment configuration:', error);
            this.messageService.error('Failed to load environment configuration. Using defaults.');
            
            // Set default values
            this.cachedConfig = {
                AQUIFER_API_KEY: '',
                AQUIFER_API_URL: 'https://api.aquifer.bible'
            };
            
            this.configInitialized = true;
        }
    }

    async get(key: string): Promise<string | undefined> {
        // Wait for initialization if it's not done yet
        if (!this.configInitialized) {
            await this.initPromise;
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
