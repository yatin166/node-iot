import { TokenConfig } from '../../../config/Token.config';
import { JWTServiceImpl } from './JWT.service';

export interface RefreshTokenPayload {
    userId: string;
}

export interface RefreshTokenService {
    getToken(payload: RefreshTokenPayload): string

    verifyToken(token: string): RefreshTokenPayload
}

export class RefreshTokenServiceImpl extends JWTServiceImpl<RefreshTokenPayload> implements RefreshTokenService {

    getToken(payload: RefreshTokenPayload): string {
       return  this.create(payload, TokenConfig.refreshToken())
    }

    verifyToken(token: string): RefreshTokenPayload {
        return this.verify(token, TokenConfig.refreshToken().secret)
    }
}
