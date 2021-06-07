import express from 'express';
import { Controller } from './Main.controller';

const Path = {
    Details: '/:id/details',
}

export class UserController implements Controller {
    public readonly router: express.Router;

    constructor(router: express.Router) {
        this.router = router;
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(Path.Details, this.getUserDetails.bind(this))
    }

    getUserDetails(req: express.Request, res: express.Response) {
        res.send({ message: 'User API: '+ req.params.id })
    }
}
