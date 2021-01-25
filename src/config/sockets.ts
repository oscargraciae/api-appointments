import { Server, Socket } from "socket.io";
import { BusinessService } from "../apiMarket/business/business.service";
import { MyRequest } from "./types";

const setupSocket = (server: any, request: MyRequest) => {
  const io = new Server(server);

  request.socketIo = io;

  io.on("connection", async (socket : Socket) => {
    console.log('Conectando sockets', socket.id);
    
    // socket.emit('listado', await new BusinessService().getAll());

    socket.on('hola', async (coords) => {
      console.log('Coordenadas de busqueda', coords);
      // return await new BusinessService().getAll(coords)
      socket.emit('listado', await new BusinessService().getAll(coords));
    })

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