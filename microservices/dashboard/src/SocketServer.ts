import { Server, Socket } from "socket.io";

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
        });
    }

    private emitDataForClient(socket: Socket) {
        socket.on('dataForServer', (data) => {
            socket.broadcast.emit('dataForClient', data);
        });
    }

    private disconnect(socket: Socket) {
        socket.on('disconnect', () => {
            console.log('Connection destroyed: ' + socket.id)
        });
    }
}