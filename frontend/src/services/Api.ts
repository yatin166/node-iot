import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { AccessTokenRequest } from '../dto/request/AccessToken.request';
import { AccessTokenResponse } from '../dto/response/AccessToken.response';
import { LocalStorage, LocalStorageKey } from '../storage/LocalStorage';

export class Api {

    private readonly basePath: string;
    protected readonly http: AxiosInstance;

    constructor(basePath: string) {
        this.basePath = basePath;
        this.http = axios.create()
        this.http.interceptors.request.use(this.onRequestFulfilled, this.onRequestError);
        this.http.interceptors.response.use(this.onResponseFulfilled, this.onResponseError)
    }

    private onRequestFulfilled = (config: AxiosRequestConfig): AxiosRequestConfig => {
        const token = LocalStorage.getAccessToken();
        if (token) {
            config.headers['Authorization'] = LocalStorage.getAccessToken();
        }
        config.url = this.basePath + config.url;
        return config
    }

    private onRequestError = (error: AxiosError): Promise<AxiosError> => {
        console.error({
            errorCode: error.code,
            message: error.message
        })
        return Promise.reject(error);
    }

    private onResponseFulfilled = (response: AxiosResponse): AxiosResponse => {
        return response;
    }

    private onResponseError = (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            const refreshToken = localStorage.getRefreshToken();
            return this.getAccessToken('/access-token', refreshToken)
                .then(response => {
                    if (response.status === 200) {
                        LocalStorage.persist(LocalStorageKey.ACCESS_TOKEN, response.data.accessToken);
                        return axios(originalRequest);
                    }
                })
                .catch(error => {
                    console.error({
                        errorCode: error.code,
                        message: error.message
                    })
                    return Promise.reject(error);
                });
            }
    }

    public async getAccessToken(path: string, accessTokenRequest: AccessTokenRequest) {
        return this.http.post<AccessTokenResponse>(path, accessTokenRequest);
    }
}