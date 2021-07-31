import { Api } from "./Api"
import { io, Socket } from 'socket.io-client';

const Path = {
    Base: 'http://localhost:8000/'
}

export class SocketService {

    public getTimeSeriesSocket(): Socket {
        return io(Path.Base);
    }
}