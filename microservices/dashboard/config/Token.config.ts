export class TokenConfig {

    public static accessTokenSecret(): string {
        if (process.env.ACCESS_TOKEN_SECRET)
            return process.env.ACCESS_TOKEN_SECRET
        return 'HeD7y2RjKXcXUVKMrnfcNKwlyenM0bIk'
    }
}