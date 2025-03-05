import { injectable, postConstruct } from '@theia/core/shared/inversify';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

@injectable()
export class EnvConfigBackendService {
    private config: Record<string, string> = {};
    
    @postConstruct()
    protected init(): void {
        this.loadEnvConfig();
    }

    private loadEnvConfig(): void {
        try {
            // Try to load from .env file in the extension directory
            const envPath = path.resolve(__dirname, '../../.env');
            console.log('Looking for .env file at:', envPath);
            
            if (fs.existsSync(envPath)) {
                const envConfig = dotenv.parse(fs.readFileSync(envPath));
                this.config = { ...this.config, ...envConfig };
                console.log('Loaded environment configuration from .env file');
                
                // Log the keys we found (but not the values for security)
                const keys = Object.keys(envConfig);
                console.log('Environment keys found in .env:', keys);
            } else {
                console.warn('.env file not found at', envPath);
            }
            
            // Also load from process.env (useful for production deployment)
            const processEnvKeys = ['AQUIFER_API_KEY', 'AQUIFER_API_URL'];
            const processEnvValues: Record<string, string> = {};
            
            processEnvKeys.forEach(key => {
                if (process.env[key]) {
                    processEnvValues[key] = process.env[key] as string;
                }
            });
            
            this.config = { 
                ...this.config, 
                ...processEnvValues
            };
            
            if (Object.keys(processEnvValues).length > 0) {
                console.log('Loaded environment variables from process.env:', Object.keys(processEnvValues));
            }
            
            // Verify we have the required keys
            const requiredKeys = ['AQUIFER_API_KEY', 'AQUIFER_API_URL'];
            const missingKeys = requiredKeys.filter(key => !this.config[key]);
            
            if (missingKeys.length > 0) {
                console.warn('Missing required environment variables:', missingKeys);
            } else {
                console.log('All required environment variables are present');
            }
        } catch (error) {
            console.error('Error loading environment configuration:', error);
        }
    }

    get(key: string): string | undefined {
        return this.config[key];
    }

    getApiKey(): Promise<string> {
        const key = this.get('AQUIFER_API_KEY') || '';
        return Promise.resolve(key);
    }

    getApiUrl(): Promise<string> {
        const url = this.get('AQUIFER_API_URL') || 'https://api.aquifer.bible';
        return Promise.resolve(url);
    }

    getEnvConfig(): Promise<Record<string, string>> {
        return Promise.resolve({
            AQUIFER_API_KEY: this.get('AQUIFER_API_KEY') || '',
            AQUIFER_API_URL: this.get('AQUIFER_API_URL') || 'https://api.aquifer.bible'
        });
    }
}
