export const envConfigServicePath = '/services/env-config';

export const EnvConfigService = Symbol('EnvConfigService');

export interface EnvConfigService {
    getApiKey(): Promise<string>;
    getApiUrl(): Promise<string>;
    getEnvConfig(): Promise<Record<string, string>>;
}
