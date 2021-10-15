import {Request, Response} from 'express';
import { Get, Controller } from '../decorators/RouteDecorators';

@Controller('/user')
export default class TestController {
    
  @Get('/')
  public index(req: Request, res: Response) {
    return res.send('User overview');
  }

  @Get('/:name')
  public details(req: Request, res: Response) {
    return res.send(`You are looking at the profile of ${req.params.name}`);
  }
}
