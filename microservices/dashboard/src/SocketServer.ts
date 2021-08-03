import socketIO from "socket.io";

export class SocketServer {
    private readonly socketServer: socketIO.Server;

    constructor(socketServer: socketIO.Server) {
        this.socketServer = socketServer;
    }

    public enableEvents() {
        this.socketServer.on('connection', (socket: socketIO.Socket) => {
            console.log('New connection established: ' + socket.id)

            socket.on('dataForServer', (data) => {
                console.log('dataForServer', data)
                socket.broadcast.emit('dataForClient', data);
            });

            socket.on('disconnect', () => console.log('Connection destroyed: ' + socket.id));
        });
    }
}