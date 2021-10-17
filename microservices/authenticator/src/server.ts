import express from 'express'
import cors from 'cors';
import { MainAuthenticationController } from './controllers/base/Main.authentication.controller';
import bodyParser from 'body-parser'
import { Database } from './database/Database';
import { Metadata, router } from './decorators/RouteDecorators';
import 'reflect-metadata';
import { AuthenticationController } from './controllers/Authentication.controller';

export class Server extends Database {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainAuthenticationController: MainAuthenticationController

    constructor(
        expressApplication: express.Application,
        port: number,
        mainAuthenticationController: MainAuthenticationController,
        databaseConnectionUrl: string
    ) {
        super(databaseConnectionUrl)
        this.expressApplication = expressApplication;
        this.port = port;
        this.mainAuthenticationController = mainAuthenticationController;
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(cors())
        this.expressApplication.use(bodyParser.json());

        for (const route of this.mainAuthenticationController.routerConfiguration) {

            const metada = Reflect.getMetadata(Metadata.ROUUTES, AuthenticationController)
            console.log('metadata', metada)
            this.expressApplication.use(route.path, router)
        }
    }

    public up() {

        this.connect()
            .then(() => this.listenServer())
            .catch(error => console.log('error', error))
    }

    private listenServer() {
        this.expressApplication.listen(this.port, () => {
            console.log(`Database connection successful`)
            console.log(`Authentication server is up and running on ${this.port}`)
        });
    }
}
