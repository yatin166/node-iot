import jwt from 'jsonwebtoken'

export interface JWTConfig {
    expiresInSeconds: number;
    secret: string
}

export interface JWTService<T> {
    create(payload: T, config: JWTConfig): string

    verify(token: string, signInSecret: string): T
}

export class JWTServiceImpl<T extends object> implements JWTService<T> {

    create(payload: T, config: JWTConfig): string {
        return jwt.sign(payload, config.secret, { expiresIn: config.expiresInSeconds });
    }

    verify(token: string, signInSecret: string): T {
        return jwt.verify(token, signInSecret) as T
    }
}
