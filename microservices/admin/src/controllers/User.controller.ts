import express from 'express';
import { Request } from '../middleware/authentication.middleware';
import { GET } from '../../../common/decorators/RouteDecorators';
import { AdminController } from "./base/Main.admin.controller";
import { UserService } from '../services/User.service';

export class UserController implements AdminController {

    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    @GET('/all')
    async getAllUsers(req: Request, res: express.Response, next: express.NextFunction) {
        this.userService.getAllUsers()
            .then(users => res.send(users))
            .catch(error => next(error));
    }
}
