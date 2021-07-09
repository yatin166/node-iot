import express from 'express';
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { DashboardController } from './base/Main.dashboard.controller';

const Path = {
    All: '/time-series',
}

export class TimeSeriesController implements DashboardController {
    public readonly router: express.Router;

    constructor(router: express.Router) {
        this.router = router;
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(Path.All, authenticationMiddleware, this.getAllUsers.bind(this))
    }

    async getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send({ points: [2, 4, 1, 7, 2, 7, 2, 3, 4, 6, 3, 6, 8, 2] })
    }
}
