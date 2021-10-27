import mongoose, { ConnectOptions } from 'mongoose'
import { DatabaseConfig } from '../config/Database.config';

export class DatabaseConnection {

    protected async connect(): Promise<void> {
        const databaseOptions: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        await mongoose.connect(DatabaseConfig.connectionPath(), databaseOptions);
    }
}
