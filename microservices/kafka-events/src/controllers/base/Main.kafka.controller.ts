
const ControllerPath = {
    ApiV1: '/api/v1',
    TimeSeriesTopicController: '/time-series-topic'
}

export interface KafkaController {} 

interface ControllerConfiguration {
    controller: KafkaController,
    path: string
}

export class MainKafkaController {
    public controllerConfiguration: ControllerConfiguration[] = [];

    constructor() {
        this.controllerConfiguration.push(...this.initRouters());
    }

    private initRouters(): ControllerConfiguration[] {
        return [
            /* {
                controller: new TimeSeriesController(new SocketServiceImpl()),
                path: this.configurePath(ControllerPath.TimeSeriesController)
            } */
        ]
    }

    private configurePath(path: string): string {
        return ControllerPath.ApiV1 + path;
    }
}
