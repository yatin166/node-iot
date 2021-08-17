import { UserSocketModel, UserSocketSchema } from '../schemas/UserSocket.model';

export class UserSocketRepository {

    public static async save(socketId: string) {
        return UserSocketModel.create({ socketId });
    }

    public static async getById(id: string) {
        return UserSocketModel.findOne({ _id: id });
    }

    public static async getAll(): Promise<UserSocketSchema[]> {
        return UserSocketModel.find({});
    }
}
