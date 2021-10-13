import express, {Router, Response, NextFunction} from 'express';

enum Method {
    GET = "get"
}

export const router = Router()

const routeDecorator = (method: Method, path: string) => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        (router)[method](path, target[propertyKey]).bind(target.constructor);
        return
    }
}

export const GET = (path: string) => routeDecorator(Method.GET, path);