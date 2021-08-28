export enum LocalStorageKey {
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    ACCESS_TOKEN = 'ACCESS_TOKEN'
}

export class LocalStorage {

    public static persist(key: LocalStorageKey, data: any) {
        localStorage.setItem(key, data)
    }

    public static destroy() {
        localStorage.clear()
    }

    public static getAccessToken(): string | null {
        return localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
    }

    public static getRefreshToken(): string | null {
        return localStorage.getItem(LocalStorageKey.REFRESH_TOKEN)
    }

    public static removeRefreshToken(): void {
        return localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
    }

    public static getUserId(): string | null {

        const refreshToken = LocalStorage.getRefreshToken();

        if (!refreshToken) return null;

        const refreshTokenPayload: { userId: string } = JSON.parse(atob(refreshToken.split('.')[1]));
        return refreshTokenPayload.userId;
    }
}