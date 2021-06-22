import { RegisterRequest } from '../../dto/request/Register.request';
import { UserDetailResponse } from '../../dto/response/UserDetail.response';
import { UserModel } from '../schemas/User.model';

export class UserRepository {

    public static async create(userDetails: RegisterRequest) {
        return UserModel.create({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
        });
    }

    public static async getById(id: string) {
        return UserModel.findOne({ _id: id });
    }

    public static async getByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    public static async getAll() {
        const users = await UserModel.find({});
        return users.map(user => new UserDetailResponse(user));
    }

}
