export class ServerConfig {
    public static authenticatorServerPort(): number {
        if (process.env.AUTHENTICATION_SERVER_PORT)
            return parseInt(process.env.AUTHENTICATION_SERVER_PORT, 10)
        return 8000;
    }

    public static dashboardServerPort(): number {
        if (process.env.DASHBOARD_SERVER_PORT)
            return parseInt(process.env.DASHBOARD_SERVER_PORT, 10)
        return 8001;
    }

    public static adminServerPort(): number {
        if (process.env.ADMIN_SERVER_PORT)
            return parseInt(process.env.ADMIN_SERVER_PORT, 10)
        return 8002;
    }

    public static kafkaServerPort(): number {
        if (process.env.KAFKA_SERVER_PORT)
            return parseInt(process.env.KAFKA_SERVER_PORT, 10)
        return 8003;
    }
}
