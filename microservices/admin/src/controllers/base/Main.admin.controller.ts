import { UserController } from '../User.controller';

const Path = {
    Api: '/api/v1',
    UserController: '/user'
}

export interface AdminController { }

interface ControllerConfiguration {
    controller: AdminController,
    path: string
}

export class MainAdminController {
    public controllerConfiguration: ControllerConfiguration[] = [];

    constructor() {
        this.controllerConfiguration.push(...this.initControllers());
    }

    private initControllers(): ControllerConfiguration[] {
        return [
            {
                controller: new UserController(),
                path: this.configurePath(Path.UserController)
            }
        ]
    }

    private configurePath(path: string): string {
        return Path.Api + path;
    }
}
