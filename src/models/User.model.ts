import { Schema, Model } from 'mongoose'
import mongoose from 'mongoose'

export interface UserSchema {
    email: string,
    password: string
}

const userSchema = new Schema<UserSchema>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}).pre('save', (next) => {
    next();
    return this;
})

const User: Model<UserSchema> = mongoose.model<UserSchema>('User', userSchema);

export class UserModel {

    public static async create(userDetails: UserSchema) {
        const user = await User.create(userDetails);
    }
}
