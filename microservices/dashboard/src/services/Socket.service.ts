import { io } from 'socket.io-client';
import { UserSocketRepository } from '../database/repository/UserSocket.repository'
import { UserSocketSchema } from '../database/schemas/UserSocket.model';
import { SocketEmitResponse } from '../dto/response/SocketEmit.response';
import { SocketError } from '../errors/SocketError';

export interface SocketService {
    startEmit(userId: string): Promise<SocketEmitResponse | SocketError>
    stopEmit(userId: string): Promise<void>
    getSockets(): Promise<UserSocketSchema[]>
    getSocket(id: string): Promise<UserSocketSchema | null>
    deleteSockets(): Promise<void>
    deleteSocket(id: string): Promise<void>
}

export class SocketServiceImpl implements SocketService {

    private readonly SOCKET_SERVER_URL = 'http://localhost:8001/';

    public async startEmit(userId: string): Promise<SocketEmitResponse> {
        const userSocket = await UserSocketRepository.getById(userId);
        if (userSocket)
            throw new SocketError(409, 'Socket already created')

        const socket = io(this.SOCKET_SERVER_URL);
        socket.on('connect', async () => {
            await UserSocketRepository.save(socket.id, userId);

            const MAX = 100;
            const MIN = 10;

            setInterval(() => socket.emit('time-series', {
                userId,
                content: Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
            }), 2000);
        });

        return new SocketEmitResponse('New Socket created');
    }

    public async stopEmit(userId: string): Promise<void> {
        const userSocket = await UserSocketRepository.getById(userId);
        if (userSocket) {
            const socket = io(this.SOCKET_SERVER_URL);
            // TODO: Should be refactored
            socket.on('connect', async () => {
                socket.emit('customDisconnect', userSocket.socketId);
                socket.disconnect();
                await UserSocketRepository.delete(userSocket?.id);
            });
        }
    }

    public async getSockets(): Promise<UserSocketSchema[]> {
        console.log('in socket service')
        return await UserSocketRepository.getAll();
    }

    public async getSocket(id: string): Promise<UserSocketSchema | null> {
        return await UserSocketRepository.getById(id);
    }

    public async deleteSockets(): Promise<void> {
        await UserSocketRepository.deleteAll();
    }
    
    public async deleteSocket(id: string): Promise<void> {
        await UserSocketRepository.delete(id);
    }
}