import express from 'express';
import { LoginService } from '../services/authentication/Login.service';
import { RegisterService } from '../services/authentication/Register.service';
import { POST } from '../../../common/decorators/RouteDecorators';
import { Controller } from './base/Main.authentication.controller';

export class AuthenticationController implements Controller {
    
    private readonly loginService: LoginService;
    private readonly registerService: RegisterService;

    constructor(
        loginService: LoginService,
        registerService: RegisterService
    ) {
        this.loginService = loginService;
        this.registerService = registerService;
    }

    @POST('/login')
    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.loginService.login(req.body)
            .then(loginResponse => res.send(loginResponse))
            .catch(error => next(error))
    }

    @POST('/access-token')
    async getAccessToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.loginService.getAccessToken(req.body)
            .then(loginResponse => res.send(loginResponse))
            .catch(error => res.json({ message: 'Token Invalid' } ))
    }

    @POST('/register')
    async register(req: express.Request, res: express.Response, next: express.NextFunction) {
        this.registerService.register(req.body)
            .then(() => res.status(200).send())
            .catch(error => next(error))
    }
}
