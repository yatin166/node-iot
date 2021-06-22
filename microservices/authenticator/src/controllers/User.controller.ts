import express from 'express';
import { UserRepository } from '../database/repository/User.repository';
import { Controller } from './base/Main.authentication.controller';

const Path = {
    All: '/all',
}

export class UserController implements Controller {
    public readonly router: express.Router;

    constructor(router: express.Router) {
        this.router = router;
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(Path.All, this.getAllUsers.bind(this))
    }

    async getAllUsers(req: express.Request, res: express.Response) {
        const users = await UserRepository.getAll();
        res.send({
            users: users
        })
    }
}
