import express, {Router, Response, NextFunction} from 'express';
import 'reflect-metadata'

enum Method {
    GET = "get"
}


export const router2 = Router();

/* const routeDecorator = (method: Method, path: string) => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        (router)[method](path, target[propertyKey]).bind(target.constructor);
        return
    }
}

export const GET = (path: string) => routeDecorator(Method.GET, path); */

export interface RouteDefinition {
    path: string;
    requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
    methodName: string;
}

export enum Metadata {
  ROUUTES = 'routes'
}

export const CONTROLLER = (): ClassDecorator => {
    return (target: any) => {
      //Reflect.defineMetadata('prefix', prefix, target);
      if (!Reflect.hasMetadata(Metadata.ROUUTES, target)) {
        console.log("Does not have route metadata")
        Reflect.defineMetadata(Metadata.ROUUTES, [], target);
      }
    };
};

export const GET = (path: string) => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        (router2)['get'](path, target[propertyKey].bind(target.constructor));
        return
    }
    /* return (target: any, propertyKey: string): void => {
      if (!Reflect.hasMetadata(Metadata.ROUUTES, target.constructor)) {
        console.log("Does not have route metadata for GET decorator")
        Reflect.defineMetadata(Metadata.ROUUTES, [], target.constructor);
      }
      
      const routes: RouteDefinition[] = Reflect.getMetadata(Metadata.ROUUTES, target.constructor) as Array<RouteDefinition>;
  
      routes.push({
        requestMethod: 'get',
        path,
        methodName: propertyKey
      });

      Reflect.defineMetadata(Metadata.ROUUTES, routes, target.constructor);
    }; */
};