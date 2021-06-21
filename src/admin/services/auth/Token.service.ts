import jwt from 'jsonwebtoken'

export interface AccessTokenPayload {
    userId: string;
    userEmail: string;
}

export interface AccessTokenService {
    verify(token: string): AccessTokenPayload
}

export class AccessTokenServiceImpl implements AccessTokenService {

    verify(token: string): AccessTokenPayload {
        const tokenSecret = 'HeD7y2RjKXcXUVKMrnfcNKwlyenM0bIk';
        return jwt.verify(token, tokenSecret) as AccessTokenPayload
    }
}
