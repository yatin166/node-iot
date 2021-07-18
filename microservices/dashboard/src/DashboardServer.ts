import express from 'express'
import bodyParser from 'body-parser'
import { MainDashboardController } from './controllers/base/Main.dashboard.controller';
import { Database } from './database/Database';

export class DashboardServer extends Database {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainDashboardController: MainDashboardController

    constructor(
        expressApplication: express.Application,
        port: number,
        mainDashboardController: MainDashboardController,
        databaseConnectionUrl: string
    ) {
        super(databaseConnectionUrl)
        this.expressApplication = expressApplication;
        this.port = port;
        this.mainDashboardController = mainDashboardController;
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(bodyParser.json());

        for (const route of this.mainDashboardController.routerConfiguration) {
            this.expressApplication.use(route.path, route.controller.router);
        }
    }

    public up() {
        this.connect()
            .then(() => {
                this.expressApplication.listen(this.port, () => {
                    console.log(`Database connection successful`)
                    console.log(`Dashboard server is up and running on ${this.port}`)
                });
            })
            .catch(error => console.log('error', error))
    }
}
