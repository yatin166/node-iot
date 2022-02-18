import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { MainKafkaController } from './controllers/base/Main.kafka.controller';
import cors from 'cors';
import { reqLoggerMiddleware } from '../../common/middlewares/reqLogger.middleware';
import { authenticationMiddleware } from '../../common/middlewares/authentication.middleware';
import { DecoratorMetadata, RouteConfiguration } from '../../common/decorators/RouteDecorators';
import { DatabaseConnection } from '../../common/database/DatabaseConnection';

export class KafkaServer extends DatabaseConnection {

    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainKafkaController: MainKafkaController;

    constructor(
        expressApplication: express.Application,
        port: number,
        mainKafkaController: MainKafkaController
    ) {
        super();
        this.expressApplication = expressApplication;
        this.port = port;
        this.mainKafkaController = mainKafkaController;
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(cors())
        this.expressApplication.use(bodyParser.json());
        this.expressApplication.use(authenticationMiddleware);
        this.expressApplication.use(reqLoggerMiddleware);

        const router = Router();
        
        for (const configuration of this.mainKafkaController.controllerConfiguration) {

            const routes: Array<RouteConfiguration> = Reflect.getMetadata(DecoratorMetadata.ROUTE, configuration.controller.constructor);
    
            for (const route of routes) {
                router[route.method](route.path, route.func.bind(configuration.controller));
            }

            this.expressApplication.use(configuration.path, router)
        }
    }

    public up() {
        this.connect()
            .then(() => {
                console.log(`Database connection successful`)
                console.log(`Dashboard server is up and running on ${this.port}`)
            })
            .catch(error => console.log('error', error));
    }
}
