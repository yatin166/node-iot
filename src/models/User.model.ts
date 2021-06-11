import { Schema, Model } from 'mongoose'
import mongoose, { Document } from 'mongoose'
import { RegisterRequest } from '../dto/request/Register.request';
import { UserDetailResponse } from '../dto/response/UserDetail.response';

export interface UserSchema extends Document {
    email: string,
    password: string
}

const userSchema = new Schema<UserSchema>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
)

const User: Model<UserSchema> = mongoose.model<UserSchema>('User', userSchema);

export class UserModel {

    public static async create(userDetails: RegisterRequest) {
        await User.create({
            email: userDetails.email,
            password: userDetails.password,
        });
    }

    public static async getById(id: string) {
        return User.findOne({ id });
    }

    public static async getByEmail(email: string) {
        return User.findOne({ email });
    }

    public static async getAll() {
        const users = await User.find({});
        return users.map(user => new UserDetailResponse(user));
    }
}
