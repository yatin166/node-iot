import { AccessTokenServiceImpl } from '../../services/authentication/jwt/AccessToken.service';
import { LoginServiceImpl } from '../../services/authentication/Login.service';
import { RefreshTokenServiceImpl } from '../../services/authentication/jwt/RefreshToken.service';
import { RegisterServiceImpl } from '../../services/authentication/Register.service';
import { AuthenticationController } from '../Authentication.controller';

const ControllerPath = {
    ApiV1: '/api/v1',
    AuthenticationController: '/auth',
    UserController: '/user'
}

export interface Controller {}

interface ControllerConfiguration {
    controller: Controller,
    path: string
}

export class MainAuthenticationController {
    public controllerConfiguration: ControllerConfiguration[] = [];

    constructor() {
        this.controllerConfiguration.push(...this.initController());
    }

    private initController(): ControllerConfiguration[] {
        return [
            {
                controller: new AuthenticationController(
                    new LoginServiceImpl(
                        new RefreshTokenServiceImpl(),
                        new AccessTokenServiceImpl()
                    ),
                    new RegisterServiceImpl()
                ),
                path: this.configurePath(ControllerPath.AuthenticationController)
            }
        ]
    }

    private configurePath(path: string): string {
        return ControllerPath.ApiV1 + path;
    }
}
