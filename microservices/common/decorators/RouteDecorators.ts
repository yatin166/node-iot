import 'reflect-metadata'

export enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export enum DecoratorMetadata {
  ROUTE = 'routes'
}

export interface RouteConfiguration {
    path: string;
    method: Method;
    func: any
}

const decorator = (path: string, method: Method) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
    if (!Reflect.hasMetadata(DecoratorMetadata.ROUTE, target.constructor))
      Reflect.defineMetadata(DecoratorMetadata.ROUTE, [], target.constructor);
    
    const routeConfiguration: RouteConfiguration[] = Reflect.getMetadata(DecoratorMetadata.ROUTE, target.constructor) as RouteConfiguration[];

    routeConfiguration.push({
      path,
      method,
      func: target[propertyKey]
    });

    Reflect.defineMetadata(DecoratorMetadata.ROUTE, routeConfiguration, target.constructor);

  };
}

export const GET = (path: string) => decorator(path, Method.GET);
export const POST = (path: string) => decorator(path, Method.POST);
export const PUT = (path: string) => decorator(path, Method.PUT);
export const DELETE = (path: string) => decorator(path, Method.DELETE);