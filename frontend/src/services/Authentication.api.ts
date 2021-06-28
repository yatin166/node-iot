import { LoginRequest } from "../dto/request/Login.request";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { LoginResponse } from "../dto/response/Login.response";

const Path = {
    Base: 'http://localhost:8000/api/v1/auth',
    Login: '/login'
}

export class Authentication {
    private readonly http: AxiosInstance;

    constructor() {
        this.http = axios.create()
        this.http.interceptors.request.use(this.onSuccessRequest, this.onFailRequest)
    }

    private onSuccessRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.url = Path.Base + config.url;
        return config
    }

    private onFailRequest = (error: AxiosError): Promise<AxiosError> => {
        console.error({
            errorCode: error.code,
            message: error.message
        })
        return Promise.reject(error);
    }

    public login(loginRequest: LoginRequest) {
        return this.http.post<LoginResponse>(Path.Login, loginRequest);
    }
}