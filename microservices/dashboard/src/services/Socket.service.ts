import { io, Socket } from 'socket.io-client';

export interface SocketService {
    emitData(): void
}

export class SocketServiceImpl {

    private readonly SOCKET_SERVER_URL = 'http://localhost:8001/';

    public emitData(): void {
        const socketIoClient: Socket = io(this.SOCKET_SERVER_URL);
        const MAX = 100;
        const MIN = 10;
        setInterval(() => socketIoClient.emit('dataFromServer', Math.floor(Math.random() * (MAX - MIN + 1) + MIN)), 2000);
    }
}