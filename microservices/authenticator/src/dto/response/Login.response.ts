import { IsString, IsNotEmpty } from 'class-validator';

export class LoginResponse {

    @IsNotEmpty()
    @IsString()
    refreshToken!: string;
}
