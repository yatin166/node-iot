import express from 'express';
import { UserModel } from '../models/User.model';
import { Controller } from './Main.controller';

const Path = {
    Login: '/login',
    Register: '/register'
}

export class AuthenticationController implements Controller {
    public readonly router: express.Router;

    constructor(router: express.Router) {
        this.router = router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(Path.Login, this.login.bind(this))
        this.router.post(Path.Register, this.register.bind(this))
    }

    login(req: express.Request, res: express.Response) {
        res.send({ message: 'Login API' })
    }

    async register(req: express.Request, res: express.Response) {
        await UserModel.create({
            email: 'abc@abc.com',
            password: 'abc123'
        });
        res.send({ message: 'Register API' })
    }
}
