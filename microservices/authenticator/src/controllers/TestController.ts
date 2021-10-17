import express from 'express';
import { GET } from '../decorators/RouteDecorators';

export class TestController {

    login(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send({message: "Hello World!"})
    }
}
