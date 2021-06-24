export class ServerConfig {
    public static port(): number {
        if (process.env.SERVER_PORT)
            return parseInt(process.env.SERVER_PORT, 10)
        return 8000;
    }
}
