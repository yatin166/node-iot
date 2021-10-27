import express, { Router } from 'express'
import bodyParser from 'body-parser'
import { MainAdminController } from './controllers/base/Main.admin.controller';
import { Database } from './database/Database';
import { DecoratorMetadata, RouteConfiguration } from '../../common/decorators/RouteDecorators';
import { authenticationMiddleware } from '../../common/middlewares/authentication.middleware';
import { reqLoggerMiddleware } from '../../dashboard/src/middleware/reqLogger.middleware';

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
        this.expressApplication.use(authenticationMiddleware);
        this.expressApplication.use(reqLoggerMiddleware);
        this.expressApplication.use(adminMiddleware);

        const router = Router();

        for (const config of this.mainAdminController.controllerConfiguration) {
            const routes: Array<RouteConfiguration> = Reflect.getMetadata(DecoratorMetadata.ROUTE, config.controller.constructor);
    
            for (const route of routes) {
                router[route.method](route.path, route.func.bind(config.controller));
            }

            this.expressApplication.use(config.path, router)
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
function adminMiddleware(adminMiddleware: any) {
    throw new Error('Function not implemented.');
}

