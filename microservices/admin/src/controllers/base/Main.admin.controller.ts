import { UserServiceImpl } from '../../services/User.service';
import { UserController } from '../User.controller';

const ControllerPath = {
    ApiV1: '/api/v1',
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
                controller: new UserController(
                    new UserServiceImpl()
                ),
                path: this.configurePath(ControllerPath.UserController)
            }
        ]
    }

    private configurePath(path: string): string {
        return ControllerPath.ApiV1 + path;
    }
}
