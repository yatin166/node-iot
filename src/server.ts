import express from 'express'
import { MainController } from './controllers/Main.controller';
import { Database } from './Database';

export class Server extends Database {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainController: MainController

    constructor(
        expressApplication: express.Application,
        port: number,
        mainController: MainController,
        databaseConnectionUrl: string
    ) {
        super(databaseConnectionUrl)
        this.expressApplication = expressApplication;
        this.port = port;
        this.mainController = mainController;

        this.connect()
            .then(() => console.log(`Database connection successful`))
            .catch(error => console.log('error', error))
    }

    public async configure(): Promise<void> {
        const routes = this.mainController.routes();
        for (const route of routes) {
            this.expressApplication.use(route.path, route.controller.router);
        }
    }

    public up() {
        this.expressApplication.listen(this.port, () => {
            console.log(`Server is up and running on ${this.port}`)
        });
    }
}
