import { UserResponse } from "../../dto/response/User.response";
import { UserModel } from "../schemas/User.model";

export class UserRepository {
    public static async getAll() {
        return UserModel.find({});
    }
}