import express, { Router } from 'express';
import { Request } from '../middleware/Request'
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { reqLoggerMiddleware } from '../middleware/reqLogger.middleware';
import { DashboardController } from './base/Main.dashboard.controller';
import { SocketService } from '../services/Socket.service';
import { AUTH, DELETE, GET } from '../decorators/Route.decorator';

const Path = {
    Socket: '/socket',
    All: '/all',
    TimeSeries: '/time-series',
    Emit: '/emit',
    Stop: '/stop',
    Delete: '/delete',
    Id: '/:id'
}

export class TimeSeriesController implements DashboardController {
    public readonly router: express.Router;
    private readonly socketService: SocketService

    constructor(router: express.Router, socketService: SocketService) {
        this.router = router;
        this.socketService = socketService;
        /* this.initRoutes(); */
    }

    /*private initRoutes() {
        this.router.get(Path.TimeSeries + Path.Emit, authenticationMiddleware, reqLoggerMiddleware, this.startEmitting.bind(this));
        this.router.get(Path.TimeSeries + Path.Stop, authenticationMiddleware, reqLoggerMiddleware, this.stopEmitting.bind(this));

        this.router.get(Path.Socket + Path.All, authenticationMiddleware, reqLoggerMiddleware, this.getSockets.bind(this));
        this.router.get(Path.Socket + Path.Id, authenticationMiddleware, reqLoggerMiddleware, this.getSockets.bind(this));
        
        this.router.delete(Path.Socket + Path.Delete + Path.All, authenticationMiddleware, reqLoggerMiddleware, this.deleteSockets.bind(this));
        this.router.delete(Path.Socket + Path.Delete + Path.Id, authenticationMiddleware, reqLoggerMiddleware, this.deleteSocket.bind(this));
    }*/

    @GET('/someroute3')
    @AUTH()
    async someMethod2(req: Request, res: express.Response, next: express.NextFunction) {
        res.send({ message: 'This is given from decorator3!' });
    }

    @GET(`${Path.TimeSeries}${Path.Emit}`)
    async startEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.startEmit(req.userId)
            .then(response => res.send(response))
            .catch(error => next(error))
    }

    @GET(`${Path.TimeSeries}${Path.Stop}`)
    async stopEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.stopEmit(req.userId)
            .then(() => res.send({ message: 'Stopped socket' }))
            .catch(console.error)
    }

    @GET(`${Path.TimeSeries}${Path.All}`)
    async getSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSockets()
            .then(sockets => res.send(sockets))
            .catch(console.error);
    }

    @GET(`${Path.TimeSeries}${Path.Id}`)
    async getSocket(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSocket(req.params.id)
            .then(socket => res.send(socket))
            .catch(console.error);
    }

    @DELETE(`${Path.TimeSeries}${Path.All}`)
    async deleteSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.deleteSockets()
            .then(() => res.send({ message: 'All sockets are deleted'}))
            .catch(console.error);
    }

    @DELETE(`${Path.TimeSeries}${Path.Id}`)
    async deleteSocket(req: Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        this.socketService.deleteSocket(id)
            .then(() => res.send({ message: 'Sockets deleted'}))
            .catch(console.error);
    }
}
