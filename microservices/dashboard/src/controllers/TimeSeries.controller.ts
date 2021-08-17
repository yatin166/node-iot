import express from 'express';
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { DashboardController } from './base/Main.dashboard.controller';
import { SocketService } from '../services/Socket.service';

const Path = {
    AllSockets: '/sockets/all',
    TimeSeries: '/time-series',
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
        this.router.get(Path.TimeSeries, /* authenticationMiddleware, */ this.getTimeSeriesData.bind(this))
        this.router.get(Path.AllSockets, /* authenticationMiddleware, */ this.getSockets.bind(this))
    }

    async getTimeSeriesData(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.socketService.emitData()
            .then(() => res.send({ message: 'time series' }))
            .catch(console.error)
    }

    async getSockets(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSockets()
            .then(sockets => res.send(sockets))
            .catch(console.error);
    }
}
