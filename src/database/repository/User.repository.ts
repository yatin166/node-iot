import { RegisterRequest } from '../../dto/request/Register.request';
import { UserDetailResponse } from '../../dto/response/UserDetail.response';
import { User } from '../schemas/User.model';

export class UserRepository {

    public static async create(userDetails: RegisterRequest) {
        return User.create({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
        });
    }

    public static async getById(id: string) {
        return User.findOne({ _id: id });
    }

    public static async getByEmail(email: string) {
        return User.findOne({ email });
    }

    public static async getAll() {
        const users = await User.find({});
        return users.map(user => new UserDetailResponse(user));
    }

}
