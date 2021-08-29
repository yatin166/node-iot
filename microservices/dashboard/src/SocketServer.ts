import { Server, Socket } from "socket.io";

export interface TimeSeriesData {
    userId: string;
    content: any
}

export class SocketServer {
    private readonly socketServer: Server;

    constructor(socketServer: Server) {
        this.socketServer = socketServer;
    }

    public enableEvents() {
        this.socketServer.on('connection', (socket: Socket) => {
            console.log('New connection established: ' + socket.id)
            this.emitDataForClient(socket);
            this.disconnect(socket);      
            this.customDisconnect(socket);    
        });
    }

    private emitDataForClient(socket: Socket) {
        socket.on('time-series', (timeSeriesData: TimeSeriesData) => {
            socket.broadcast.emit(timeSeriesData.userId, timeSeriesData.content);
            socket.broadcast.emit('dataForClient', timeSeriesData);
            
        });
    }

    private disconnect(socket: Socket) {
        socket.on('disconnect', () => {
            console.log('Connection destroyed: ' + socket.id)
        });
    }

    //TODO: Should be refactored
    private customDisconnect(socket: Socket) {
        socket.on('customDisconnect', (socketId: string) => {
            this.socketServer.sockets.sockets.forEach(s => {
                if (s.id === socketId) {
                    s.disconnect();
                    console.log('custom destroyed: ' + s.id)
                }
            });
        });
    }
}