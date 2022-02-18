import express from 'express';
import { Request } from '../../../common/middlewares/Request';
import { KafkaController } from './base/Main.kafka.controller';
import { POST } from '../../../common/decorators/RouteDecorators';

export class TimeSeriesTopicController implements KafkaController {

    constructor() { }

    @POST('/produce')
    async produceEvents(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        console.log("Shall start producing the events")
    }
    
    @POST('/consume')
    async consumeEvents(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        console.log("Shall start consuming the events")
    }
}

