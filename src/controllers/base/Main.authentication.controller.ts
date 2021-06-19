import express from 'express';
import { AccessTokenServiceImpl } from '../../services/authentication/jwt/AccessToken.service';
import { LoginServiceImpl } from '../../services/authentication/Login.service';
import { RefreshTokenServiceImpl } from '../../services/authentication/jwt/RefreshToken.service';
import { RegisterServiceImpl } from '../../services/authentication/Register.service';
import { AuthenticationController } from '../Authentication.controller';
import { UserController } from '../User.controller';

const Path = {
    Api: '/api/v1',
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

export class MainAuthenticationController {
    public routerConfiguration: RouterConfiguration[] = [];

    constructor() {
        this.routerConfiguration.push(...this.initRouters());
    }

    private initRouters(): RouterConfiguration[] {
        const router = express.Router();
        return [
            {
                controller: new AuthenticationController(
                    router,
                    new LoginServiceImpl(
                        new RefreshTokenServiceImpl(),
                        new AccessTokenServiceImpl()
                    ),
                    new RegisterServiceImpl()
                ),
                path: this.configurePath(Path.AuthenticationController)
            },
            {
                controller: new UserController(router),
                path: this.configurePath(Path.UserController)
            }
        ]
    }

    private configurePath(path: string): string {
        return Path.Api + path;
    }
}
