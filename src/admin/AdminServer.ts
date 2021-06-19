import express from 'express'
import bodyParser from 'body-parser'
import { Database } from '../database/Database';
import { MainAdminController } from './controllers/base/Main.admin.controller';

export class AdminServer extends Database {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainAdminController: MainAdminController

    constructor(
        expressApplication: express.Application,
        port: number,
        mainAdminController: MainAdminController,
        databaseConnectionUrl: string
    ) {
        super(databaseConnectionUrl)
        this.expressApplication = expressApplication;
        this.port = port;
        this.mainAdminController = mainAdminController;
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(bodyParser.json());

        for (const route of this.mainAdminController.routerConfiguration) {
            this.expressApplication.use(route.path, route.controller.router);
        }
    }

    public up() {
        this.connect()
            .then(() => {
                this.expressApplication.listen(this.port, () => {
                    console.log(`Database connection successful`)
                    console.log(`Admin server is up and running on ${this.port}`)
                });
            })
            .catch(error => console.log('error', error))
    }
}
