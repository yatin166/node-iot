
export interface KafkaService {
    produce(userId: string): Promise<void>
    consume(userId: string): Promise<void>
}

export class KafkaServiceImpl implements KafkaService {

    public async produce(userId: string): Promise<void> {
        console.log("Shall start producing the events")
    }

    public async consume(userId: string): Promise<void> {
        console.log("Shall start consuming the events")
    }
}