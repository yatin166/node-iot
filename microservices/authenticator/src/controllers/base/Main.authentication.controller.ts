import { AccessTokenServiceImpl } from '../../services/authentication/jwt/AccessToken.service';
import { LoginServiceImpl } from '../../services/authentication/Login.service';
import { RefreshTokenServiceImpl } from '../../services/authentication/jwt/RefreshToken.service';
import { RegisterServiceImpl } from '../../services/authentication/Register.service';
import { AuthenticationController } from '../Authentication.controller';

const Path = {
    Api: '/api/v1',
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
                path: this.configurePath(Path.AuthenticationController)
            }
        ]
    }

    private configurePath(path: string): string {
        return Path.Api + path;
    }
}
