import { Server, Socket } from "socket.io";
import { BusinessService } from "../apiMarket/business/business.service";

const setupSocket = (server: any) => {
  const io = new Server(server);

  io.on("connection", async (socket : Socket) => {
    console.log('Conectando sockets');
    
    socket.emit('listado', await new BusinessService().getAll());
  });
}

export default setupSocket;