import { Router } from 'express';
import { authenticationMiddleware } from '../../../admin/src/middleware/authentication.middleware';
import { Request } from '../middleware/Request';

enum Method {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
}

export const router = Router()

const getRoute = (medthod: Method, path: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        //router.use(authenticationMiddleware);
        (router)[medthod](path, target[propertyKey]);
    };
}

export const AUTH = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.log(target, 'target')
        console.log(propertyKey, 'propertyKey')
        console.log(descriptor, 'descriptor')
    };
}

export function routeLog(): MethodDecorator {
    return  (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const original = descriptor.value;
        

        descriptor.value = function (...args: any[]) {
            let request = args[0] as Request;
            console.log(request)

            const {
                url,
                method,
                body,
                headers,
            } = request;

            console.log("[LOG]", {
                url,
                method,
                body,
                headers,
            });
            return original.apply(this, args);
        }
    };
}

export const GET = (path: string) => getRoute(Method.GET, path);
export const POST = (path: string) => getRoute(Method.POST, path);
export const PATCH = (path: string) => getRoute(Method.PATCH, path);
export const DELETE = (path: string) => getRoute(Method.DELETE, path);