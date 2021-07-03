import express from 'express';

const Path = {
    Api: '/api/v1',
    UserController: '/user'
}

export interface DashboardController {
    router: express.Router;
}

interface RouterConfiguration {
    controller: DashboardController,
    path: string
}

export class MainDashboardController {
    public routerConfiguration: RouterConfiguration[] = [];

    constructor() {
        this.routerConfiguration.push(...this.initRouters());
    }

    private initRouters(): RouterConfiguration[] {
        const router = express.Router();
        return []
    }

    private configurePath(path: string): string {
        return Path.Api + path;
    }
}
