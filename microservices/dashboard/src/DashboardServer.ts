import express, {Handler, Router} from 'express';
import bodyParser from 'body-parser';
import { MainDashboardController } from './controllers/base/Main.dashboard.controller';
import { Database } from './database/Database';
import socketIO from "socket.io";
import http from 'http';
import { SocketServer } from './SocketServer';
import cors from 'cors';
import {MetadataKeys, router, RouterMetadata} from './decorators/Route.decorator';
import { authenticationMiddleware } from '../../admin/src/middleware/authentication.middleware';
import { reqLoggerMiddleware } from './middleware/reqLogger.middleware';
import 'reflect-metadata';

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
        this.expressApplication.use(reqLoggerMiddleware);
        /*this.expressApplication.use(authenticationMiddleware);*/

        for (const route of this.mainDashboardController.routerConfiguration) {
            /*const controllerInstance: { [handleName: string]: Handler } = route.controller as any;
            console.log(route, 'router')
            console.log(Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerInstance), 'controllerInstance')
            const routers: RouterMetadata[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerInstance);
            console.log(routers, 'routers')

            for (const routerMetadata of routers) {
                router[routerMetadata.method](routerMetadata.path, controllerInstance[String(routerMetadata.handlerName)]);//.bind(controllerInstance));
//                (routerMetadata.path, route.controller[routerMetadata.handlerName]).bind(route.controller));
            }*/

            this.expressApplication.use(route.path, router);
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
