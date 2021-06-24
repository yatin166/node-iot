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
        if (process.env.DB_PORT)
            return parseInt(process.env.DB_PORT, 10)
        return 27017
    }

    private static getDatabaseName(): string {
        if (process.env.DB_NAME)
            return process.env.DB_NAME
        return 'iot'
    }
}
