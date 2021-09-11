import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { MainDashboardController } from './controllers/base/Main.dashboard.controller';
import { Database } from './database/Database';
import socketIO from "socket.io";
import http from 'http';
import { SocketServer } from './SocketServer';
import cors from 'cors';


const appRouter = Router()
interface IOptions {
    path: string;
    method: 'get'| 'post'| 'put' | 'delete' ;
    router?: express.Router
}

function routesDecorator(options: IOptions) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
       (appRouter)[options.method](options.path, target[propertyKey]);
    };
}

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

        for (const route of this.mainDashboardController.routerConfiguration) {
            this.expressApplication.use(route.path, route.controller.router);
        }

        this.expressApplication.use(appRouter);
    }

    @routesDecorator({
        path: '/someroute',
        method: 'get'
    })
    async someMethod(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send({ message: 'This is given from decorator!' });
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
