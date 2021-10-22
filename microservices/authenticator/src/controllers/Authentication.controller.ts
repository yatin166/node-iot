import express from 'express';
import { LoginService } from '../services/authentication/Login.service';
import { RegisterService } from '../services/authentication/Register.service';
import { Controller } from './base/Main.authentication.controller';
import { GET , CONTROLLER, Method} from '../decorators/RouteDecorators';

const Path = {
    Login: '/login',
    AccessToken: '/access-token',
    Register: '/register'
}

export class AuthenticationController {
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
        //this.router.post(Path.Login, this.login.bind(this))
        this.router.post(Path.AccessToken, this.getAccessToken.bind(this))
        this.router.post(Path.Register, this.register.bind(this))
    }

    @GET('/new-login', Method.GET)
    async login2(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.loginService.login2()
            .then(loginResponse => res.send(loginResponse))
            .catch(error => next(error))
    }

    @GET(Path.Login, Method.POST)
    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.loginService.login(req.body)
            .then(loginResponse => res.send(loginResponse))
            .catch(error => next(error))
    }

    async getAccessToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.loginService.getAccessToken(req.body)
            .then(loginResponse => res.send(loginResponse))
            .catch(error => res.json({ message: 'Token Invalid' } ))
    }

    async register(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.registerService.register(req.body)
            .then(() => res.status(200).send())
            .catch(error => next(error))
    }
}
