export class DatabaseConfig {

    public static connectionPath() {
        console.log(`mongodb://${this.getHostName()}:${this.getPort()}/${this.getDatabaseName()}`)
        return `mongodb://${this.getHostName()}:${this.getPort()}/${this.getDatabaseName()}`
    }

    private static getHostName(): string {
        if (process.env.ENVIRONMENT === 'PROD')
            return 'mongo'
        return 'localhost'
    }

    private static getPort(): string {
        if (process.env.DB_PORT)
            return process.env.DB_PORT
        return '27017'
    }

    private static getDatabaseName(): string {
        if (process.env.DB_NAME)
            return process.env.DB_NAME
        return 'iot'
    }
}
