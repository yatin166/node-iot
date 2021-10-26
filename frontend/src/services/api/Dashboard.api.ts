import { SocketEmitResponse } from "../../dto/response/SocketEmit.response";
import { Api } from "./Api";

const Path = {
    Base: 'http://localhost:8001/api/v1',
    TimeSeries: '/data/time-series',
    Emit: '/emit/start',
    Stop: '/emit/stop'
}

export class DashboardApi extends Api {

    constructor() {
        super(Path.Base)
    }

    public async startEmitting() {
        return await this.http.get<SocketEmitResponse>(Path.TimeSeries + Path.Emit);
    }

    public async stopEmitting() {
        return await this.http.get<void>(Path.TimeSeries + Path.Stop);
    }
}