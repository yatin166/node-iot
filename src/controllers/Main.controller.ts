import express from 'express';
import { AccessTokenServiceImpl } from '../services/authentication/AccessToken.service';
import { LoginServiceImpl } from '../services/authentication/Login.service';
import { RefreshTokenServiceImpl } from '../services/authentication/RefreshToken.service';
import { RegisterServiceImpl } from '../services/authentication/Register.service';
import { AuthenticationController } from './Authentication.controller';
import { UserController } from './User.controller';

const Path = {
    Api: '/api',
    AuthenticationController: '/auth',
    UserController: '/user'
}

export interface Controller {
    router: express.Router;
}

interface RouterConfiguration {
    controller: Controller,
    path: string
}

export class MainController {
    public router: express.Router;
    public routerConfiguration: RouterConfiguration[] = [];

    constructor() {
        this.router = express.Router();
        this.routerConfiguration.push(...this.initRouters());
    }

    private initRouters(): RouterConfiguration[] {
        return [
            {
                controller: new AuthenticationController(
                    this.router,
                    new LoginServiceImpl(
                        new RefreshTokenServiceImpl(),
                        new AccessTokenServiceImpl()
                    ),
                    new RegisterServiceImpl()
                ),
                path: this.configurePath(Path.AuthenticationController)
            },
            {
                controller: new UserController(this.router),
                path: this.configurePath(Path.UserController)
            }
        ]
    }

    private configurePath(path: string): string {
        return Path.Api + path;
    }
}
