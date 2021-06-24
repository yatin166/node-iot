export class DatabaseConfig {

    public static connectionPath() {
        return `mongodb://${this.getHostName()}:${this.getPort()}/${this.getDatabaseName()}`
    }

    private static getHostName(): string {
        if (process.env.ENVIRONMENT === 'PROD')
            return 'mongo'
        return 'localhost'
    }

    private static getPort(): number {
        return 27017
    }

    private static getDatabaseName(): string {
        return 'iot'
    }
}
