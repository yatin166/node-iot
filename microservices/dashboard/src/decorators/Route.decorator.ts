import { Router } from 'express';
import { reqLoggerMiddleware } from '../middleware/reqLogger.middleware';

interface IOptions {
    path: string;
    router: Router
}

export const router = Router()

export const GET = (path: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
       (router.use(reqLoggerMiddleware))['get'](path, target[propertyKey]);
    };
}