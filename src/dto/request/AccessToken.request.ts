import { IsString } from 'class-validator';

export class AccessTokenRequest {

    @IsString()
    refreshToken!: string;
}
