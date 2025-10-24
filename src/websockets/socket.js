import { Server } from "socket.io";
import pkg from "signale";

const { Signale } = pkg;
const logger = new Signale({ scope: "WebSocket" });

/**
 * Inicia el servidor de Socket.IO
 * @param {import('http').Server} server - Servidor HTTP principal
 * @returns {Server} instancia de Socket.IO
 */
export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    logger.info(`Cliente conectado: ${socket.id}`);

    //Evento de prueba al conectar
    socket.emit("nueva_tarea", {
      message: "Bienvenido al sistema de notificaciones",
      data: { ejemplo: "Socket.io corriendo" }
    });

    socket.on("disconnect", () => {
      logger.info(`Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
}

