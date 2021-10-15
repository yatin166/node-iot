import express, {Router, Response, NextFunction} from 'express';
import 'reflect-metadata'

enum Method {
    GET = "get"
}

export const router = Router();

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

export interface RouteDefinition {
    path: string;
    requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
    methodName: string;
  }

export const ControllerDe = (prefix: string = ''): ClassDecorator => {
    return (target: any) => {
      Reflect.defineMetadata('prefix', prefix, target);
  
      // Since routes are set by our methods this should almost never be true (except the controller has no methods)
      if (! Reflect.hasMetadata('routes', target)) {
        Reflect.defineMetadata('routes', [], target);
      }
    };
};

export const Get = (path: string) => {
    return (target: any, propertyKey: string): void => {
      if (! Reflect.hasMetadata('routes', target.constructor)) {
        Reflect.defineMetadata('routes', [], target.constructor);
      }
      const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
  
      routes.push({
        requestMethod: 'get',
        path,
        methodName: propertyKey
      });
      Reflect.defineMetadata('routes', routes, target.constructor);
    };
};