import express, { Router } from 'express';
import { Request } from '../middleware/Request'
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { reqLoggerMiddleware } from '../middleware/reqLogger.middleware';
import { DashboardController } from './base/Main.dashboard.controller';
import { SocketService } from '../services/Socket.service';

const Path = {
    Socket: '/socket',
    All: '/all',
    TimeSeries: '/time-series',
    Emit: '/emit',
    Stop: '/stop',
    Delete: '/delete',
    id: '/:id'
}

/* function logMethod(
    target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
): PropertyDescriptor {
        
    const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args: any[]) {

        // convert list of greet arguments to string
        const params = args.map(a => JSON.stringify(a)).join();

        // invoke greet() and get its return value
        const result = method.apply(this, args);

        // convert result to string
        const r = JSON.stringify(result);

        // display in console the function call details
        console.log(`Call: ${propertyName}(${params}) => ${r}`);

        // return the result of invoking the method
        return result;
    }
    return propertyDesciptor;
}; */

function logMethod(
    router: express.Router,
    controller: any,
    methodType: 'get' | 'post' | 'put' | 'delete',
    path: string,
    propertyDesciptor?: PropertyDescriptor
) {

    //return router.get(path, authenticationMiddleware, reqLoggerMiddleware, propertyDesciptor.value.bind(controller));
    /* const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args: any[]) {

        // convert list of greet arguments to string
        const params = args.map(a => JSON.stringify(a)).join();

        // invoke greet() and get its return value
        const result = method.apply(this, args);

        // convert result to string
        const r = JSON.stringify(result);

        // display in console the function call details
        console.log(`Call: ${propertyName}(${params}) => ${r}`);

        // return the result of invoking the method
        return result;
    }
    return propertyDesciptor; */
};

interface IOptions {
    path: string;
    method: 'get'| 'post'| 'put' | 'delete' ;
    router: Router
}

function routesDecorator(options: IOptions) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
       (options.router)[options.method](options.path, target[propertyKey]);
    };
}

export class TimeSeriesController implements DashboardController {
    public readonly router: express.Router;
    private readonly socketService: SocketService
    public static staticRouter: express.Router = Router();

    constructor(router: express.Router, socketService: SocketService) {
        this.router = router;
        this.socketService = socketService;
        this.initRoutes();
        routesDecorator.bind(this)
    }

    private initRoutes() {
        this.router.get(Path.TimeSeries + Path.Emit, authenticationMiddleware, reqLoggerMiddleware, this.startEmitting.bind(this));
        this.router.get(Path.TimeSeries + Path.Stop, authenticationMiddleware, reqLoggerMiddleware, this.stopEmitting.bind(this));

        this.router.get(Path.Socket + Path.All, authenticationMiddleware, reqLoggerMiddleware, this.getSockets.bind(this));
        this.router.get(Path.Socket + Path.id, authenticationMiddleware, reqLoggerMiddleware, this.getSockets.bind(this));
        
        this.router.delete(Path.Socket + Path.Delete + Path.All, authenticationMiddleware, reqLoggerMiddleware, this.deleteSockets.bind(this));
        this.router.delete(Path.Socket + Path.Delete + Path.id, authenticationMiddleware, reqLoggerMiddleware, this.deleteSocket.bind(this));
    }

    @routesDecorator({
        path: '/someroute2',
        method: 'get',
        router: TimeSeriesController.staticRouter
    })
    async someMethod(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send({ message: 'This is given from decorator2!' });
    }

    async startEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.startEmit(req.userId)
            .then(response => res.send(response))
            .catch(error => next(error))
    }

    async stopEmitting(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        
        this.socketService.stopEmit(req.userId)
            .then(() => res.send({ message: 'Stopped socket' }))
            .catch(console.error)
    }

    async getSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSockets()
            .then(sockets => res.send(sockets))
            .catch(console.error);
    }

    async getSocket(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.getSocket(req.params.id)
            .then(socket => res.send(socket))
            .catch(console.error);
    }

    async deleteSockets(req: Request, res: express.Response, next: express.NextFunction) {
        this.socketService.deleteSockets()
            .then(() => res.send({ message: 'All sockets are deleted'}))
            .catch(console.error);
    }

    async deleteSocket(req: Request, res: express.Response, next: express.NextFunction) {
        const id: string = req.params.id;
        this.socketService.deleteSocket(id)
            .then(() => res.send({ message: 'Sockets deleted'}))
            .catch(console.error);
    }
}
