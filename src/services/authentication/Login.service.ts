import { UserRepository } from '../../database/repository/User.repository';
import { AccessTokenRequest } from '../../dto/request/AccessToken.request';
import { LoginRequest } from '../../dto/request/Login.request';
import { AccessTokenResponse } from '../../dto/response/AccessToken.response';
import { LoginResponse } from '../../dto/response/Login.response';
import { AccessTokenService, AccessTokenPayload } from './jwt/AccessToken.service';
import { RefreshTokenPayload, RefreshTokenService } from './jwt/RefreshToken.service';

export interface LoginService {
    login(loginRequest: LoginRequest): Promise<LoginResponse>

    getAccessToken(accessTokenRequest: AccessTokenRequest): Promise<AccessTokenResponse | undefined>
}

export class LoginServiceImpl implements LoginService {

    private readonly refreshTokenService: RefreshTokenService;
    private readonly accessTokenService: AccessTokenService;

    constructor(refreshTokenService: RefreshTokenService, accessTokenService: AccessTokenService) {
        this.refreshTokenService = refreshTokenService;
        this.accessTokenService = accessTokenService;
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const user = await UserRepository.getByEmail(loginRequest.email);

        if (!user || user.password !== loginRequest.password) {
            throw new Error('Wrong user password or Email')
        }

        const payload: RefreshTokenPayload = {
            userId: user.id
        }

        const loginResponse: LoginResponse = {
            refreshToken: this.refreshTokenService.getToken(payload)
        }

        return loginResponse
    }

    async getAccessToken(accessTokenRequest: AccessTokenRequest): Promise<AccessTokenResponse | undefined> {
        const refreshTokenPayload = this.refreshTokenService.verifyToken(accessTokenRequest.refreshToken);

        const user = await UserRepository.getById(refreshTokenPayload.userId);

        if (!user) throw new Error('Wrong user password or Email')

        const payload: AccessTokenPayload= {
            userId: user.id,
            userEmail: user.email
        }

        const accessTokenResponse: AccessTokenResponse = {
            accessToken: this.accessTokenService.getToken(payload)
        }

        return accessTokenResponse;
    }
}
