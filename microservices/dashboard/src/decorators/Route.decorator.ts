import express, {Router, Response, NextFunction} from 'express';
import { Request } from '../middleware/Request';
import { authenticationMiddleware } from '../../../admin/src/middleware/authentication.middleware';
import { reqLoggerMiddleware } from '../middleware/reqLogger.middleware';
//const Reflect = require('reflect-metadata')
import "reflect-metadata";
import {isInstance} from "class-validator";
import {TimeSeriesController} from "../controllers/TimeSeries.controller";

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
        /!*console.log(propertyKey)
        console.log(target)
        console.log(Reflect.has(target, propertyKey));*!/
        (router)[method](path, target[propertyKey]).bind(target);
    };
}*/

export interface RouterMetadata {
    method: Method;
    path: string;
    handlerName: string | symbol;
}

export enum MetadataKeys {
    BASE_PATH = 'base_path',
    ROUTERS = 'routers',
}

/*const routeDecorator = (method: Method) => {
    return (path: string): MethodDecorator => {
        return (target: any, propertyKey: any) => {
            const controllerClass = target.constructor;
            console.log(Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass), 'controllerInstance')
            const routers: RouterMetadata[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
                : [];
            routers.push({
                method,
                path,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
            console.log(Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass), 'controllerInstance2')
        }
    }
}*/

export const routes: any[] = [];

function routeDecorator(method: Method, path: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        /*const response = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const original = await descriptor.value(req, res, next);

                res.status(200).json(original);
            } catch (e) {
                res.status(500).json({
                    message: "Some error occurred",
                    error: e.message,
                    stack: e.stack,
                });
            }
        }*/
        //(router)[method](path, target[propertyKey]).bind(target);
        //(router)[method](path, response);
        /*console.log("target ", target)
        console.log("propertyKey ", propertyKey)
        console.log("target[propertyKey] ", target[propertyKey].toString())
        console.log("descriptor.value ", descriptor.value);
        target.constructor.bind(target[propertyKey]);
        (router)[method](path, target[propertyKey]);*/
        console.log("target.constructor.name", target.constructor.name)
        console.log(target instanceof TimeSeriesController)
    }
}

export const GET = (path: string) => routeDecorator(Method.GET, path);
/*
export const POST = (path: string) => routeDecorator(Method.POST, path);
export const PATCH = (path: string) => routeDecorator(Method.PATCH, path);
export const DELETE = (path: string) => routeDecorator(Method.DELETE, path);*/
