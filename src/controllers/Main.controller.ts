import express from 'express';

export class MainController {
    public router: express.Router;

    constructor() {
        this.router = express.Router();

        this.router.get('/api', (req: express.Request, res: express.Response) => {
            res.send({ message: 'express main api' })
        });
    }
}
