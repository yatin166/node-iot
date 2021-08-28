import { Api } from "./Api";

const Path = {
    Base: 'http://localhost:8001/api/v1',
    TimeSeries: '/data/time-series',
}

export class DashboardApi extends Api {

    constructor() {
        super(Path.Base)
    }

    public async emitData() {
        return await this.http.get<void>(Path.TimeSeries);
    }
}