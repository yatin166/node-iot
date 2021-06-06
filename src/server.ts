import express from 'express'
import { MainController } from './controllers/Main.controller';

export class Server {
    private readonly expressApplication: express.Application;
    private readonly port: number;
    private readonly mainController: MainController

    constructor(
        expressApplication: express.Application,
        port: number,
        mainController: MainController
    ) {
        this.expressApplication = expressApplication;
        this.port = port;
        this.mainController = mainController;
    }

    public async configure(): Promise<void> {
        this.expressApplication.use(this.mainController.router);
    }

    public listen() {
        this.expressApplication.listen(this.port, () => {
            console.log(`Server is up and running on ${this.port}`)
        });
    }
}
