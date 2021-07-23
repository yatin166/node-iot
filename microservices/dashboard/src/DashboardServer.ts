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
    private server: http.Server;
    private io: socketIO.Server;

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
        

        this.expressApplication.use(bodyParser.json());

        for (const route of this.mainDashboardController.routerConfiguration) {
            this.expressApplication.use(route.path, route.controller.router);
        }


        this.server = new http.Server(this.expressApplication)
        this.io = new socketIO.Server(this.server);



        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)

            socket.on("message", function(message: any) {
                console.log(message);
            });

            socket.on('disconnect', function () {
                console.log('socket disconnected : ' + socket.id);
            });
        })

    }
    public Start() {
        this.server.listen(this.port)
        console.log( `Server listening on port ${this.port}.` )

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log('a user connected : ' + socket.id)

            socket.on("message", function(message: any) {
                console.log(message);
            });

            socket.on('disconnect', function () {
                console.log('socket disconnected : ' + socket.id);
            });
        })
    }

    /* public async configure(): Promise<void> {
        this.expressApplication.use(bodyParser.json());

        for (const route of this.mainDashboardController.routerConfiguration) {
            this.expressApplication.use(route.path, route.controller.router);
        }
    }

    public up() {
        this.connect()
            .then(() => {
                const socketIoServer = new socketIO.Server(
                    this.expressApplication.listen(this.port, () => {
                        console.log(`Database connection successful`)
                        console.log(`Dashboard server is up and running on ${this.port}`)
                    })
                );

                socketIoServer.on('connection', (socket: socketIO.Socket) => {
                    console.log('a user connected : ' + socket.id)
        
                    socket.on('disconnect', function () {
                        console.log('socket disconnected : ' + socket.id);
                    });
                })
            })
            .catch(error => console.log('error', error));
    } */
}
