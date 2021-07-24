import express from 'express'
import bodyParser from 'body-parser'
import { MainDashboardController } from './controllers/base/Main.dashboard.controller';
import { Database } from './database/Database';
import socketIO from "socket.io"
import http from 'http';

export class DashboardServer extends Database {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainDashboardController: MainDashboardController;
    private readonly httpServer: http.Server;
    private readonly socketIoServer: socketIO.Server;

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

        this.httpServer = new http.Server(this.expressApplication)
        this.socketIoServer = new socketIO.Server(this.httpServer, { cors: {  origin: '*' } } );
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(bodyParser.json());

        for (const route of this.mainDashboardController.routerConfiguration) {
            this.expressApplication.use(route.path, route.controller.router);
        }
    }

    public up() {
        this.connect()
            .then(() => {
                this.httpServer.listen(this.port, () => {
                    console.log(`Database connection successful`)
                    console.log(`Dashboard server is up and running on ${this.port}`)
                });

                this.socketIoServer.on('connection', (socket: socketIO.Socket) => {
                    console.log('a user connected : ' + socket.id)
        
                    socket.on('disconnect', function () {
                        console.log('socket disconnected : ' + socket.id);
                    });
                });
            })
            .catch(error => console.log('error', error));
    }
}
