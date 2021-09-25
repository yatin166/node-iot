import { SocketServiceImpl } from '../../services/Socket.service';
import { TimeSeriesController } from '../TimeSeries.controller';

const Path = {
    Api: '/api/v1',
    TimeSeriesController: '/data'
}

export interface DashboardController { }

interface RouterConfiguration {
    controller: DashboardController,
    path: string
}

export class MainDashboardController {
    public routerConfiguration: RouterConfiguration[] = [];

    constructor() {
        this.routerConfiguration.push(...this.initRouters());
    }

    private initRouters(): RouterConfiguration[] {
        return [
            {
                controller: new TimeSeriesController(new SocketServiceImpl()),
                path: this.configurePath(Path.TimeSeriesController)
            }
        ]
    }

    private configurePath(path: string): string {
        return Path.Api + path;
    }
}
