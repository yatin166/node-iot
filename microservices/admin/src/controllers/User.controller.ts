import express from 'express';
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { AdminController } from "./base/Main.admin.controller";

const Path = {
    All: '/all',
}

export class UserController implements AdminController {

    async getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
        //const users = await UserRepository.getAll();
        res.send({
            users: 'This shall return all users'
        })
    }
}
