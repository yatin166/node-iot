import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequest {

    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}
