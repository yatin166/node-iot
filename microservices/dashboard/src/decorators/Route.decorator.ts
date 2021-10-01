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
        (router)[medthod](path, descriptor.value);
        //return descriptor;

        descriptor.value = (...args: any[]) => {
            args[0] = args[0] as Request;
            return descriptor.value.apply(this, (router)[medthod](path, target[propertyKey]));
        };

        /* const response = (req: Request, res: Response) => {
            const original = descriptor.value(req, res);

            res.status(200).json(original);
        }

        server.app[method](path, response); */

        return descriptor;

    };
}

export const GET = (path: string) => getRoute(Method.GET, path);
export const POST = (path: string) => getRoute(Method.POST, path);
export const PATCH = (path: string) => getRoute(Method.PATCH, path);
export const DELETE = (path: string) => getRoute(Method.DELETE, path);