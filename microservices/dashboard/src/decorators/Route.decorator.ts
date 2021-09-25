import { Router } from 'express';
import { authenticationMiddleware } from '../../../admin/src/middleware/authentication.middleware';
import { reqLoggerMiddleware } from '../middleware/reqLogger.middleware';

enum Method {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
}

export const router = Router()

const getRoute = (medthod: Method, path: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        router.use(authenticationMiddleware);
        router.use(reqLoggerMiddleware);
        (router)[medthod](path, target[propertyKey]);
    };
}

export const GET = (path: string) => getRoute(Method.GET, path);
export const POST = (path: string) => getRoute(Method.POST, path);
export const PATCH = (path: string) => getRoute(Method.PATCH, path);
export const DELETE = (path: string) => getRoute(Method.DELETE, path);