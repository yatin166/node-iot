import express from 'express';
import { RegisterRequest } from '../dto/request/Register.request';
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
        const registerRequest = req.body as RegisterRequest
        await UserModel.create(registerRequest);
        res.send({ message: 'Register API' })
    }
}
