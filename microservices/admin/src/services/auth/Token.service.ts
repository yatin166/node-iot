import jwt from 'jsonwebtoken'
import { TokenConfig } from '../../../../config/Token.config';

export interface AccessTokenPayload {
    userId: string;
    userEmail: string;
}

export interface AccessTokenService {
    verify(token: string): AccessTokenPayload
}

export class AccessTokenServiceImpl implements AccessTokenService {

    verify(token: string): AccessTokenPayload {
        return jwt.verify(token, TokenConfig.accessTokenSecret()) as AccessTokenPayload
    }
}
