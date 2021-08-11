import { Schema, Model } from 'mongoose'
import mongoose, { Document } from 'mongoose'

export interface UserSocketSchema extends Document {
    socketId: string
}

const userSocketSchema = new Schema<UserSocketSchema>(
    {
        socketId:  { type: String, required: true }
    },
    { timestamps: true }
)

export const UserSocketModel: Model<UserSocketSchema> = mongoose.model<UserSocketSchema>('UserSocket', userSocketSchema);
