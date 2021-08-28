import { io, Socket } from 'socket.io-client';
import { UserSocketRepository } from '../database/repository/UserSocket.repository'
import { UserSocketSchema } from '../database/schemas/UserSocket.model';
import { TimeSeriesData } from '../SocketServer';

export interface SocketService {
    emitData(userId: string): Promise<void>
    getSockets(): Promise<UserSocketSchema[]>
}

export class SocketServiceImpl {

    private readonly SOCKET_SERVER_URL = 'http://localhost:8001/';

    public async emitData(userId: string): Promise<void> {
        const socket = io(this.SOCKET_SERVER_URL);
        await socket.on('connect', async () => {
            await UserSocketRepository.save(socket.id);

            const MAX = 100;
            const MIN = 10;

            setInterval(() => socket.emit(
                'time-series', 
                {
                    userId,
                    content: Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
                }
            ), 2000);
        });
    }

    public async getSockets(): Promise<UserSocketSchema[]> {
        return await UserSocketRepository.getAll();
    }
}