import { UserRepository } from '../../database/repository/User.repository';
import { RegisterRequest } from '../../dto/request/Register.request';

export interface RegisterService {
    register(registerRequest: RegisterRequest): Promise<void>
}

export class RegisterServiceImpl implements RegisterService {

    async register(registerRequest: RegisterRequest): Promise<void> {
        await UserRepository.create(registerRequest);
    }
}
