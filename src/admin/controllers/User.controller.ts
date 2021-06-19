import express from 'express';
import { AdminController } from "./base/Main.admin.controller";

const Path = {
    All: '/all',
}

export class UserController implements AdminController {
    public readonly router: express.Router;

    constructor(router: express.Router) {
        this.router = router;
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(Path.All, this.getAllUsers.bind(this))
    }

    async getAllUsers(req: express.Request, res: express.Response) {
        //const users = await UserRepository.getAll();
        res.send({
            users: 'This shall return all users'
        })
    }
}