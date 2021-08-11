import { io, Socket } from 'socket.io-client';
import { UserSocketRepository } from '../database/repository/UserSocket.repository'

export interface SocketService {
    emitData(): void
}

export class SocketServiceImpl {

    private readonly SOCKET_SERVER_URL = 'http://localhost:8001/';

    public async emitData(): Promise<void> {
        const socket = io(this.SOCKET_SERVER_URL);
        await UserSocketRepository.save(socket.id);
    }
}