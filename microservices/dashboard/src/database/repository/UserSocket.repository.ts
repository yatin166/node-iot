import { UserSocketModel, UserSocketSchema } from '../schemas/UserSocket.model';

export class UserSocketRepository {

    public static async save(socketId: string, userId: string) {
        return UserSocketModel.create({ socketId, userId });
    }

    public static async getById(id: string): Promise<UserSocketSchema | null> {
        return UserSocketModel.findOne({ userId: id });
    }

    public static async delete(id: string) {
        return UserSocketModel.deleteOne({ _id: id });
    }

    public static async deleteAll() {
        return UserSocketModel.deleteMany({});
    }

    public static async getAll(): Promise<UserSocketSchema[]> {
        console.log('in socket repo')
        return UserSocketModel.find({});
    }
}
