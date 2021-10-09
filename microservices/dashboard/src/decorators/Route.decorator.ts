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

/*const getRoute = (method: Method, path: string) => {
    return (target: any, propertyKey: any, descriptor: PropertyDescriptor) => {
        //console.log(descriptor.value.toString());
        //(router)[method](path).bind(descriptor.value);
        //(router)[method](path, propertyKey)//.bind(descriptor.value);
        /!*const sb: any = new target();
        console.log(sb)
        console.log(propertyKey)*!/
        /!*(router)[method](path, descriptor.value)//.bind(target.constructor)
        return descriptor;*!/
        /!*const responseFn = async (req: Request, res: Response) => {
            try {
                const original = await descriptor.value(req, res);

                res.status(200).json(original);
            } catch (e) {
                res.status(500).json({
                    message: "Some error occurred",
                    error: e.message,
                    stack: e.stack,
                });
            }
        }*!/

        /!*(router)[method](path, (req, res, next) => {
            descriptor.value(req, res, next)
        });*!/
    };
}*/

/*const routeDecorator = (method: Method) => {
    return (path: string): MethodDecorator => {
        return (target: any, propertyKey: any) => {
            const controllerClass = target.constructor;
            const routers: IRouter[] =  Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
                Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];
            routers.push({
                method,
                path,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
        }
    }
}*/

export const GET = (path: string) => getRoute(Method.GET, path);
export const POST = (path: string) => getRoute(Method.POST, path);
export const PATCH = (path: string) => getRoute(Method.PATCH, path);
export const DELETE = (path: string) => getRoute(Method.DELETE, path);