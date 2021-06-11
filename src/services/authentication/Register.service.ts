import { RegisterRequest } from '../../dto/request/Register.request';
import { UserModel } from '../../models/User.model';

export interface RegisterService {
    register(registerRequest: RegisterRequest): Promise<void>
}

export class RegisterServiceImpl implements RegisterService {

    async register(registerRequest: RegisterRequest): Promise<void> {
        await UserModel.create(registerRequest);
    }
}
