import express from 'express';

export class TestController {

    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send({message: "Hello World!"})
    }
}
