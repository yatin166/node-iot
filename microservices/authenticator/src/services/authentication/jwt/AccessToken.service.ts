import { TokenConfig } from '../../../config/Token.config';
import { JWTServiceImpl } from './JWT.service';

export interface AccessTokenPayload {
    userId: string;
    userEmail: string;
}

export interface AccessTokenService {
    getToken(payload: AccessTokenPayload): string

    verifyToken(token: string): AccessTokenPayload
}

export class AccessTokenServiceImpl extends JWTServiceImpl<AccessTokenPayload> implements AccessTokenService {

    getToken(payload: AccessTokenPayload): string {
        return this.create(payload, TokenConfig.accessToken())
    }

    verifyToken(token: string): AccessTokenPayload {
        return this.verify(token, TokenConfig.refreshToken().secret)
    }
}
