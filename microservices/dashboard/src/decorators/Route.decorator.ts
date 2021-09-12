import express, { Router } from 'express';
import { authenticationMiddleware } from '../../../admin/src/middleware/authentication.middleware';
import { reqLoggerMiddleware } from '../middleware/reqLogger.middleware';
import { Request } from '../middleware/Request'

interface IOptions {
    path: string;
    router: Router
}

enum Method {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
}

export const router = Router()

const getRoute = (medthod: Method, path: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            /* console.log('inside')

            const request = args[0] as express.Request;
            const response = args[1] as express.Response;
            const nextFunction = args[1] as express.NextFunction;

            const headers = request.headers; */
            console.log(args[0], ' args[0]')
        }
        console.log(descriptor.value() , ' descriptor.value')
        router.use(authenticationMiddleware);
        (router)[medthod](path, target[propertyKey]);

    };
}

export const GET = (path: string) => getRoute(Method.GET, path);
export const POST = (path: string) => getRoute(Method.POST, path);
export const PATCH = (path: string) => getRoute(Method.PATCH, path);
export const DELETE = (path: string) => getRoute(Method.DELETE, path);