import { Schema, Model } from 'mongoose'
import mongoose, { Document } from 'mongoose'

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

export const User: Model<UserSchema> = mongoose.model<UserSchema>('User', userSchema);
