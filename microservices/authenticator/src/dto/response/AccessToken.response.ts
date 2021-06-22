import { IsString } from 'class-validator';

export class AccessTokenResponse {

    @IsString()
    accessToken!: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}
