import express from 'express';
import { UserController } from '../User.controller';

const Path = {
    Api: '/api/v1',
    UserController: '/user'
}

export interface AdminController {
    router: express.Router;
}

interface RouterConfiguration {
    controller: AdminController,
    path: string
}

export class MainAdminController {
    public routerConfiguration: RouterConfiguration[] = [];

    constructor() {
        this.routerConfiguration.push(...this.initRouters());
    }

    private initRouters(): RouterConfiguration[] {
        const router = express.Router();
        return [
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
