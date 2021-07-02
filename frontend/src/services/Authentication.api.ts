import { AccessTokenRequest } from "../dto/request/AccessToken.request";
import { LoginRequest } from "../dto/request/Login.request";
import { AccessTokenResponse } from "../dto/response/AccessToken.response";
import { LoginResponse } from "../dto/response/Login.response";
import { LocalStorage, LocalStorageKey } from "../storage/LocalStorage";
import { Api } from "./Api";

const Path = {
    Base: 'http://localhost:8000/api/v1/auth',
    Login: '/login',
    AccessToken: '/access-token'
}

export class Authentication extends Api {

    constructor() {
        super(Path.Base)
    }

    public async login(loginRequest: LoginRequest) {
        const loginResponse = await this.http.post<LoginResponse>(Path.Login, loginRequest);
        LocalStorage.persist(LocalStorageKey.REFRESH_TOKEN ,loginResponse.data.refreshToken);
        const accessTokenRequest: AccessTokenRequest = { refreshToken: loginResponse.data.refreshToken }
        this.getAccessToken(Path.AccessToken, accessTokenRequest)
            .then(response => LocalStorage.persist(LocalStorageKey.ACCESS_TOKEN, response.data.accessToken))
            .catch(error => console.error(error))
    }
}