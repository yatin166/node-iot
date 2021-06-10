import { IsString, IsNotEmpty } from 'class-validator';
import { UserSchema } from '../../models/User.model';

export class UserDetailResponse {

    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    constructor(userSchema: UserSchema) {
        this.id = userSchema.id;
        this.email = userSchema.email;
    }
}
