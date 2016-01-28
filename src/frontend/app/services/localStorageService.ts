export class LocalStorageService {
    public set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public get(key: string): any {
        const item = localStorage.getItem(key);

        if (item && item !== null) {
            return JSON.parse(item);
        }

        // Intentionally return undefined if no item was set.
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}
