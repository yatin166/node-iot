import { UserSocketModel, UserSocketSchema } from '../schemas/UserSocket.model';

export class UserSocketRepository {

    public static async save(socketId: string, userId: string) {
        return UserSocketModel.create({ socketId, userId });
    }

    public static async getById(id: string) {
        return UserSocketModel.findOne({ _id: id });
    }

    public static async delete(id: string) {
        return UserSocketModel.deleteOne({ _id: id });
    }

    public static async getAll(): Promise<UserSocketSchema[]> {
        return UserSocketModel.find({});
    }
}
