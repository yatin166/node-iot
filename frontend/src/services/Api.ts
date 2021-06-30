import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

export class Api {

    private readonly basePath: string;
    protected readonly http: AxiosInstance;

    constructor(basePath: string) {
        this.basePath = basePath;
        this.http = axios.create()
        this.http.interceptors.request.use(this.onSuccessRequest, this.onFailRequest)
    }

    private onSuccessRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.url = this.basePath + config.url;
        return config
    }

    private onFailRequest = (error: AxiosError): Promise<AxiosError> => {
        console.error({
            errorCode: error.code,
            message: error.message
        })
        return Promise.reject(error);
    }
}