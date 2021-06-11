import { JWTConfig } from '../services/authentication/jwt/JWT.service';

export class TokenConfig {
    private static readonly tokenSecret = 'HeD7y2RjKXcXUVKMrnfcNKwlyenM0bIk';

    public static refreshToken(): JWTConfig {
        return {
            expiresInSeconds: 5, // 2h
            secret: this.tokenSecret
        }
    }

    public static accessToken(): JWTConfig {
        return {
            expiresInSeconds: 60 * 2, // 2m
            secret: this.tokenSecret
        }
    }
}
