import express, { Router } from 'express'
import cors from 'cors';
import { MainAuthenticationController } from './controllers/base/Main.authentication.controller';
import bodyParser from 'body-parser'
import { Database } from './database/Database';
import { DecoratorMetadata, RouteConfiguration } from './decorators/RouteDecorators';
import 'reflect-metadata';

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

        const router = Router();

        for (const configuration of this.mainAuthenticationController.controllerConfiguration) {

            const routes: Array<RouteConfiguration> = Reflect.getMetadata(DecoratorMetadata.ROUTE, configuration.controller.constructor);
    
            for (const route of routes) {
                console.log('ROUTE ', route)
                router[route.method](route.path, route.func.bind(configuration.controller));
            }

            this.expressApplication.use(configuration.path, router)
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
