import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { MainDashboardController } from './controllers/base/Main.dashboard.controller';
import { Database } from './database/Database';
import socketIO from "socket.io";
import http from 'http';
import { SocketServer } from './SocketServer';
import cors from 'cors';
import { reqLoggerMiddleware } from './middleware/reqLogger.middleware';
import { authenticationMiddleware } from '../../common/middlewares/authentication.middleware';
import { DecoratorMetadata, RouteConfiguration } from '../../common/decorators/RouteDecorators';

export class DashboardServer extends Database {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainDashboardController: MainDashboardController;
    private readonly httpServer: http.Server;
    private readonly socketServer: SocketServer;

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

        this.httpServer = new http.Server(this.expressApplication);
        this.socketServer = new SocketServer(
            new socketIO.Server(
                this.httpServer,
                { cors: {  origin: '*' } } 
            )
        );
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(cors())
        this.expressApplication.use(bodyParser.json());
        this.expressApplication.use(authenticationMiddleware);
        this.expressApplication.use(reqLoggerMiddleware);

        const router = Router();
        
        for (const configuration of this.mainDashboardController.controllerConfiguration) {

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
                this.httpServer.listen(this.port, () => {
                    console.log(`Database connection successful`)
                    console.log(`Dashboard server is up and running on ${this.port}`)
                });

                this.socketServer.enableEvents();
            })
            .catch(error => console.log('error', error));
    }
}
