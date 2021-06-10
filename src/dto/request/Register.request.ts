import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterRequest {

    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}
