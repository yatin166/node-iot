import { SocketServiceImpl } from '../../services/Socket.service';
import { TimeSeriesController } from '../TimeSeries.controller';

const ControllerPath = {
    ApiV1: '/api/v1',
    TimeSeriesController: '/data'
}

export interface DashboardController {} 

interface ControllerConfiguration {
    controller: DashboardController,
    path: string
}

export class MainDashboardController {
    public controllerConfiguration: ControllerConfiguration[] = [];

    constructor() {
        this.controllerConfiguration.push(...this.initRouters());
    }

    private initRouters(): ControllerConfiguration[] {
        return [
            {
                controller: new TimeSeriesController(new SocketServiceImpl()),
                path: this.configurePath(ControllerPath.TimeSeriesController)
            }
        ]
    }

    private configurePath(path: string): string {
        return ControllerPath.ApiV1 + path;
    }
}
