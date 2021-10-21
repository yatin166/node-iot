import express, { Router } from 'express'
import cors from 'cors';
import { MainAuthenticationController } from './controllers/base/Main.authentication.controller';
import bodyParser from 'body-parser'
import { Database } from './database/Database';
import { Metadata, RouteDefinition } from './decorators/RouteDecorators';
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

        const ro = Router();

        for (const route of this.mainAuthenticationController.routerConfiguration) {
            this.expressApplication.use(route.path, route.controller.router)
            console.log('constructor name ', route.controller.constructor.name)
            console.log('metadata ', Reflect.getMetadata(Metadata.ROUUTES, route.controller.constructor))

            const routes: Array<RouteDefinition> = Reflect.getMetadata(Metadata.ROUUTES, route.controller.constructor);
    
            routes.forEach(route2 => {
                ro[route2.requestMethod](route2.path, (req: express.Request, res: express.Response) => {
                  route.controller[route2.methodName](req, res);
                });
            });
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
