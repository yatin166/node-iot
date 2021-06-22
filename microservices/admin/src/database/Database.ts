import mongoose, { ConnectOptions } from 'mongoose'

export class Database {
    private readonly connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    protected async connect(): Promise<void> {
        const databaseOptions: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        await mongoose.connect(this.connectionString, databaseOptions);
    }
}
