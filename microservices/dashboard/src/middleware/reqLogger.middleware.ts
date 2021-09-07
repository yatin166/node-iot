import express from 'express';
import { Request } from './Request'

export const reqLoggerMiddleware = (
    req: Request,
    res: express.Response, 
    next: express.NextFunction
) => {
    console.log('Request path:', { API_URI: `${req.rawHeaders[1]}${req.baseUrl}${req.url}`});
}