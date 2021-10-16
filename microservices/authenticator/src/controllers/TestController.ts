import express from 'express';
import { Get } from '../decorators/RouteDecorators';

export class TestController {

    @Get("/ne-login")
    login(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send({message: "Hello World!"})
    }
}
