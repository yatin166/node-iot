import express from 'express';
import { Request } from '../../../common/middlewares/Request';
import { KafkaController } from './base/Main.kafka.controller';
import { POST } from '../../../common/decorators/RouteDecorators';
import { KafkaService } from '../services/Kafka.service';

export class TimeSeriesTopicController implements KafkaController {

    private readonly kafkaService: KafkaService;

    constructor(kafkaService: KafkaService) { 
        this.kafkaService = kafkaService;
    }

    @POST('/produce')
    async produceEvents(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        this.kafkaService.produce(req.userId);
    }
    
    @POST('/consume')
    async consumeEvents(req: Request, res: express.Response, next: express.NextFunction) {
        if (!req.userId)
            return res.send({ message: 'Could not find userId in the request' });
        this.kafkaService.produce(req.userId);
    }
}

