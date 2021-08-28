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
        console.log('Emiting');
        const socket = io(this.SOCKET_SERVER_URL);
        await socket.on('connect', async () => {
            await UserSocketRepository.save(socket.id);

            const timeSeriesData: TimeSeriesData = {
                userId,
                content: 2
            }
            
            socket.emit('time-series', timeSeriesData);
        });
    }

    public async getSockets(): Promise<UserSocketSchema[]> {
        return await UserSocketRepository.getAll();
    }
}