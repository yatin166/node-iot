export enum LocalStorageKey {
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    ACCESS_TOKEN = 'ACCESS_TOKEN'
}

export class LocalStorage {

    public static persist(key: LocalStorageKey, data: any) {
        localStorage.setItem(key, data)
    }

    public static getAccessToken(): string | null {
        return localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
    }

    public static getRefreshToken(): string | null {
        return localStorage.getItem(LocalStorageKey.REFRESH_TOKEN)
    }
}