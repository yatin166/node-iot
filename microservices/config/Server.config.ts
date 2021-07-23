export class ServerConfig {
    public static authenticatorServerPort(): number {
        if (process.env.SERVER_PORT)
            return parseInt(process.env.SERVER_PORT, 10)
        return 8000;
    }

    public static dashboardServerPort(): number {
        if (process.env.SERVER_PORT)
            return parseInt(process.env.SERVER_PORT, 10)
        return 9001;
    }

    public static adminServerPort(): number {
        if (process.env.SERVER_PORT)
            return parseInt(process.env.SERVER_PORT, 10)
        return 8002;
    }
}
