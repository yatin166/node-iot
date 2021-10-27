import express, { Router } from 'express'
import cors from 'cors';
import { MainAuthenticationController } from './controllers/base/Main.authentication.controller';
import bodyParser from 'body-parser'
import { DatabaseConnection } from '../../common/database/DatabaseConnection';
import { DecoratorMetadata, RouteConfiguration } from '../../common/decorators/RouteDecorators';
import { reqLoggerMiddleware } from '../../common/middlewares/reqLogger.middleware';
import 'reflect-metadata';

export class Server extends DatabaseConnection {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainAuthenticationController: MainAuthenticationController

    constructor(
        expressApplication: express.Application,
        port: number,
        mainAuthenticationController: MainAuthenticationController
    ) {
        super()
        this.expressApplication = expressApplication;
        this.port = port;
        this.mainAuthenticationController = mainAuthenticationController;
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(cors())
        this.expressApplication.use(bodyParser.json());
        this.expressApplication.use(reqLoggerMiddleware);

        const router = Router();

        for (const configuration of this.mainAuthenticationController.controllerConfiguration) {

            const routes: Array<RouteConfiguration> = Reflect.getMetadata(DecoratorMetadata.ROUTE, configuration.controller.constructor);
    
            for (const route of routes) {
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
