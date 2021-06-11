import { LoginRequest } from '../../dto/request/Login.request';
import { LoginResponse } from '../../dto/response/Login.response';
import { UserModel } from '../../models/User.model';
import { AccessTokenService, AccessTokenPayload } from './AccessToken.service';
import { RefreshTokenPayload, RefreshTokenService } from './RefreshToken.service';

export interface LoginService {
    login(loginRequest: LoginRequest): Promise<LoginResponse>

    getAccessToken(refreshToken: string): Promise<string | undefined>
}

export class LoginServiceImpl implements LoginService {

    private readonly refreshTokenService: RefreshTokenService;
    private readonly accessTokenService: AccessTokenService;

    constructor(refreshTokenService: RefreshTokenService, accessTokenService: AccessTokenService) {
        this.refreshTokenService = refreshTokenService;
        this.accessTokenService = accessTokenService;
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const user = await UserModel.getByEmail(loginRequest.email);

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

    async getAccessToken(refreshToken: string): Promise<string | undefined> {
        try {
            const refreshTokenPayload = this.refreshTokenService.verifyToken(refreshToken);

            const user = await UserModel.getById(refreshTokenPayload.userId);

            if (!user) throw new Error('Wrong user password or Email')

            const payload: AccessTokenPayload= {
                userId: user.id,
                userEmail: user.email
            }

            const accessToken = this.accessTokenService.getToken(payload);

            return accessToken;
        } catch (error) {
            console.log(error)
        }
    }
}
