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
        //(router)[method](path, target[propertyKey]).bind(target);
        //(router)[method](path, response);
        /*console.log("target ", target)
        console.log("propertyKey ", propertyKey)
        console.log("target[propertyKey] ", target[propertyKey].toString())
        console.log("descriptor.value ", descriptor.value);
        target.constructor.bind(target[propertyKey]);
        (router)[method](path, target[propertyKey]);*/
        //console.log("target.constructor.name", target.constructor.name)

        (router)[method](path, target[propertyKey]).bind(target.constructor);
    }
}

export const GET = (path: string) => routeDecorator(Method.GET, path);