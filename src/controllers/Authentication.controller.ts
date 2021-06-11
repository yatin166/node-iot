import express from 'express';
import { RegisterRequest } from '../dto/request/Register.request';
import { UserModel } from '../models/User.model';
import { LoginService } from '../services/authentication/Login.service';
import { RegisterService } from '../services/authentication/Register.service';
import { Controller } from './Main.controller';

const Path = {
    Login: '/login',
    Register: '/register'
}

export class AuthenticationController implements Controller {
    public readonly router: express.Router;
    private readonly loginService: LoginService;
    private readonly registerService: RegisterService;

    constructor(
        router: express.Router,
        loginService: LoginService,
        registerService: RegisterService
    ) {
        this.router = router;
        this.loginService = loginService;
        this.registerService = registerService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(Path.Login, this.login.bind(this))
        this.router.post(Path.Register, this.register.bind(this))
    }

    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.loginService.login(req.body)
            .then(loginResponse => res.send(loginResponse))
            .catch(error => next(error))
    }

    async register(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.registerService.register(req.body)
            .then(() => res.status(200).send())
            .catch(error => next(error))
    }
}
