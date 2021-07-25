import express from 'express';
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { DashboardController } from './base/Main.dashboard.controller';
import { SocketService } from '../services/Socket.service';

const Path = {
    All: '/time-series',
}

export class TimeSeriesController implements DashboardController {
    public readonly router: express.Router;
    private readonly socketService: SocketService

    constructor(router: express.Router, socketService: SocketService) {
        this.router = router;
        this.socketService = socketService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(Path.All, /* authenticationMiddleware, */ this.getTimeSeriesData.bind(this))
    }

    async getTimeSeriesData(req: express.Request, res: express.Response, next: express.NextFunction) {
        const MAX = 100;
        const MIN = 10;
        setTimeout(() => this.socketService.emitData(Math.floor(Math.random() * (MAX - MIN + 1) + MIN)), 2000);
        //res.send({ points: [2, 4, 1, 7, 2, 7, 2, 3, 4, 6, 3, 6, 8, 2] })
    }
}
