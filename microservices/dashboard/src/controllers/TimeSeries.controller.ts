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
        res.send({ message: 'time series' })
    }
}
