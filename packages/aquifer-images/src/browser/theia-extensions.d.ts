declare module '@theia/core/lib/browser/frontend-application-state' {
    export function useInjection<T>(serviceIdentifier: symbol | string | interfaces.Newable<T> | interfaces.Abstract<T>): T;
}
