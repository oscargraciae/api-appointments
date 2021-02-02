import { Server, Socket } from "socket.io";

const setupSocket = (server: any, app: any) => {
  const io = new Server(server);

  io.on("connection", async (socket : Socket) => {
    console.log('Conectando sockets', socket.id);
    
    app.socketIo = io;
    app.socket = socket;
    // socket.emit('listado', await new BusinessService().getAll());

    // socket.on('hola', async (coords) => {
    //   socket.emit('listado', await new BusinessService().getAll(coords));
    // })

    // socket.emit('saludo', { message: 'Hola mundo 1234' });

    socket.on('disconnect', () => {
      console.log('Disconnected', socket.id);
      socket.disconnect(true);
  });

    // socket.disconnect()

    // socket.on('end', function (){
    //   socket.disconnect();
    // });
  });
}

export default setupSocket;