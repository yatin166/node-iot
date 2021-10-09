import express from 'express';
import { Request } from '../middleware/Request'
import { DashboardController } from './base/Main.dashboard.controller';
import { SocketService } from '../services/Socket.service';
import { DELETE, GET } from '../decorators/Route.decorator';

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

    constructor(socketService: SocketService) {
        this.socketService = socketService;
    }

    //@GET(`${Path.TimeSeries}${Path.Emit}`)
    async startEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.startEmit(req.userId)
            .then(response => res.send(response))
            .catch(error => next(error))
    }

    //@GET(`${Path.TimeSeries}${Path.Stop}`)
    async stopEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.stopEmit(req.userId)
            .then(() => res.send({ message: 'Stopped socket' }))
            .catch(error => next(error))
    }

    @GET(`${Path.Socket}${Path.All}`)
    async getSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSockets()
            .then(sockets => res.send(sockets))
            .catch(error => next(error));
    }

    //@GET(`${Path.Socket}${Path.Id}`)
    async getSocket(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSocket(req.params.id)
            .then(socket => res.send(socket))
            .catch(error => next(error));
    }

    @DELETE(`${Path.Socket}${Path.All}`)
    async deleteSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.deleteSockets()
            .then(() => res.send({ message: 'All sockets are deleted'}))
            .catch(error => next(error));
    }

    @DELETE(`${Path.Socket}${Path.Id}`)
    async deleteSocket(req: Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        this.socketService.deleteSocket(id)
            .then(() => res.send({ message: 'Sockets deleted'}))
            .catch(error => next(error));
    }
}
