import { io, Socket } from 'socket.io-client';

export interface SocketService {
    emitData(data: number)
}

export class SocketServiceImpl {

    private readonly SOCKET_SERVER_URL = 'http://localhost:8001/';
    private readonly socketIoClient: Socket;

    constructor() {
        this.socketIoClient = io(this.SOCKET_SERVER_URL);
    }

    public emitData(data: number) {
        this.socketIoClient.emit('data', data);
    }
}