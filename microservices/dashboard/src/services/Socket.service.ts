import { io, Socket } from 'socket.io-client';

export interface SocketService {
    emitData(): void
}

export class SocketServiceImpl {

    private readonly SOCKET_SERVER_URL = 'http://localhost:8001/';

    public emitData(): void {
        // TODO: emit data
    }
}