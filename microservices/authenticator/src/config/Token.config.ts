import { JWTConfig } from '../services/authentication/jwt/JWT.service';

export class TokenConfig {
    private static readonly tokenSecret = 'HeD7y2RjKXcXUVKMrnfcNKwlyenM0bIk';

    public static refreshToken(): JWTConfig {
        if (process.env.REFRESH_TOKEN_SECRET && process.env.REFRESH_TOKEN_EXPIRY) {
            return {
                expiresInSeconds: parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10), // 2h
                secret: process.env.REFRESH_TOKEN_SECRET
            }
        }
        return {
            expiresInSeconds: 60 * 60 * 2, // 2h
            secret: this.tokenSecret
        }
    }

    public static accessToken(): JWTConfig {
        if (process.env.ACCESS_TOKEN_SECRET && process.env.ACCESS_TOKEN_EXPIRY) {
            return {
                expiresInSeconds: parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10), // 2h
                secret: process.env.ACCESS_TOKEN_SECRET
            }
        }
        return {
            expiresInSeconds: 60 * 2, // 2m
            secret: this.tokenSecret
        }
    }
}
