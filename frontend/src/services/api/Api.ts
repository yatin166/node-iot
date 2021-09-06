import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { AccessTokenRequest } from '../../dto/request/AccessToken.request';
import { AccessTokenResponse } from '../../dto/response/AccessToken.response';
import { LocalStorage, LocalStorageKey } from '../../storage/LocalStorage';

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
            config.headers['Authorization'] = token;
        }
        //TODO: should be refactored:
        if (config.url && config.url.includes('8001')) {
            config.url = 'http://localhost:8000' + config.url;
            console.log(config.url)
        }else {
            config.url = this.basePath + config.url;
        }
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
        if (error.response?.status === 403) {
            console.log('Token invalid should get new access token')
            const refreshToken = LocalStorage.getRefreshToken();
            if (!refreshToken) {
                LocalStorage.removeRefreshToken();
                window.location.reload();
                return Promise.reject(error);
            }
            return this.getAccessToken('/auth/access-token', { refreshToken })
                .then(response => {
                    console.log('Got new access token', response)
                    if (response.status === 200) {
                        LocalStorage.persist(LocalStorageKey.ACCESS_TOKEN, response.data.accessToken);
                        return axios(originalRequest);
                    }
                    LocalStorage.removeRefreshToken();
                    return
                })
                .catch(error => {
                    console.error({
                        errorCode: error.code,
                        message: error.message
                    })
                    LocalStorage.removeRefreshToken();
                    //window.location.reload();
                    return Promise.reject(error);
                });
            }
    }

    public async getAccessToken(path: string, accessTokenRequest: AccessTokenRequest) {
        return this.http.post<AccessTokenResponse>(path, accessTokenRequest);
    }
}