import express from 'express';
import { Request } from '../../../common/middlewares/Request';
import { DashboardController } from './base/Main.dashboard.controller';
import { SocketService } from '../services/Socket.service';
import { DELETE, GET } from '../../../common/decorators/RouteDecorators';

export class TimeSeriesController implements DashboardController {
    
    private readonly socketService: SocketService

    constructor(socketService: SocketService) {
        this.socketService = socketService;
    }

    @GET('/time-series/emit/start')
    async startEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        console.log('USERID: ', req.userId)
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.startEmit(req.userId)
            .then(response => res.send(response))
            .catch(error => next(error))
    }
    
    @GET('/time-series/emit/stop')
    async stopEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.stopEmit(req.userId)
            .then(() => res.send({ message: 'Stopped socket' }))
            .catch(error => next(error))
    }

    @GET('/socket/all')
    async getSockets(req: Request, res: express.Response, next: express.NextFunction) {
        console.log('in socket controller')
        this.socketService.getSockets()
            .then(sockets => res.send(sockets))
            .catch(error => next(error));
    }
    
    @GET('/socket/:id')
    async getSocket(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSocket(req.params.id)
            .then(socket => res.send(socket))
            .catch(error => next(error));
    }
    
    @DELETE('/socket/all')
    async deleteSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.deleteSockets()
            .then(() => res.send({ message: 'All sockets are deleted'}))
            .catch(error => next(error));
    }
    
    @DELETE('/socket/:id')
    async deleteSocket(req: Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        this.socketService.deleteSocket(id)
            .then(() => res.send({ message: 'Sockets deleted'}))
            .catch(error => next(error));
    }
}

