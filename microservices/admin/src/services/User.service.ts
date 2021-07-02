import { UserRepository } from "../database/repository/User.repository";
import { UserResponse } from "../dto/response/User.response";

export interface UserService {
    getAllUsers(): Promise<UserResponse[]>
}

export class UserServiceImpl implements UserService {

    public async getAllUsers(): Promise<UserResponse[]> {
        const users = await UserRepository.getAll();
        return users.map(user => new UserResponse(user));
    }
}