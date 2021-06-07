import express from 'express';
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

    public routes(): RouterConfiguration[] {
        return this.routerConfiguration;
    }

    private initRouters(): RouterConfiguration[] {
        return [
            {
                controller: new AuthenticationController(this.router),
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
