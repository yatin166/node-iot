export enum LocalStorageKey {
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    ACCESS_TOKEN = 'ACCESS_TOKEN'
}

export class LocalStorage {

    public static persist(key: LocalStorageKey, data: any) {
        localStorage.setItem(key, data)
    }
}