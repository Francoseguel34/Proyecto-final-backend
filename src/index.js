import "reflect-metadata";
import app from "./app.js";
import { envs } from "./configuration/envs.js";
import pkg from "signale";
import { AppDataSource } from "./providers/datasource.provider.js"; 
import { initSocket } from "./websockets/socket.js";
import http from "http";
import { Server } from "socket.io";
import { Profesor } from "./module/profesor/entity/profesor.entity.js";
import { Alumno } from "./module/alumno/entity/alumno.entity.js";
import { Materia } from "./module/materia/entity/materia.entity.js";
import { Tarea } from "./module/tarea/entity/tarea.entity.js";
import { AlumnoMateria } from "./module/alumno_materia/entity/alumno_materia.entity.js";

const { Signale } = pkg;
const logger = new Signale({ scope: "Main" });

const main = async () => {
  try {
    // Inicializa la conexión con TypeORM
    await AppDataSource.initialize();
    logger.success("✅ Conectado a la base de datos");

    // HTTP y Socket.IO
    const server = http.createServer(app);
    const io = initSocket(server);

    app.set("io", io);

    // Inicia el servidor 
    const PORT = envs.PORT || 3000;
server.listen(PORT, () => {
  logger.start(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("❌ No se pudo conectar a la base de datos", error);
  }
};

main();
