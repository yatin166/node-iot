import express from 'express';
import { Request } from '../middleware/Request'
import { DashboardController } from './base/Main.dashboard.controller';
import { SocketService } from '../services/Socket.service';
import { authenticationMiddleware } from '../../../admin/src/middleware/authentication.middleware';

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
    
    private readonly socketService: SocketService
    public readonly router: express.Router;

    constructor(socketService: SocketService, router: express.Router) {
        this.router = router;
        this.socketService = socketService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${Path.TimeSeries}${Path.Emit}`, authenticationMiddleware, this.startEmitting.bind(this))
        this.router.get(`${Path.TimeSeries}${Path.Stop}`, authenticationMiddleware, this.stopEmitting.bind(this))
        this.router.get(`${Path.Socket}${Path.All}`, authenticationMiddleware, this.getSockets.bind(this))
        this.router.get(`${Path.Socket}${Path.Id}`, authenticationMiddleware, this.getSocket.bind(this))
        this.router.delete(`${Path.Socket}${Path.All}`, authenticationMiddleware, this.deleteSockets.bind(this))
        this.router.delete(`${Path.Socket}${Path.Id}`, authenticationMiddleware, this.deleteSocket.bind(this))
    }

    private async startEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.startEmit(req.userId)
            .then(response => res.send(response))
            .catch(error => next(error))
    }
    
    private async stopEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.stopEmit(req.userId)
            .then(() => res.send({ message: 'Stopped socket' }))
            .catch(error => next(error))
    }

    private async getSockets(req: Request, res: express.Response, next: express.NextFunction) {
        console.log('in socket controller')
        this.socketService.getSockets()
            .then(sockets => res.send(sockets))
            .catch(error => next(error));
    }
    
    private async getSocket(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSocket(req.params.id)
            .then(socket => res.send(socket))
            .catch(error => next(error));
    }
    
    private async deleteSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.deleteSockets()
            .then(() => res.send({ message: 'All sockets are deleted'}))
            .catch(error => next(error));
    }
    
    private async deleteSocket(req: Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        this.socketService.deleteSocket(id)
            .then(() => res.send({ message: 'Sockets deleted'}))
            .catch(error => next(error));
    }
}
