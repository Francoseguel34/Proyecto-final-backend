import "reflect-metadata";
import http from "http";
import app from "./app.js";
import { envs } from "./configuration/envs.js";
import { AppDataSource } from "./providers/datasource.provider.js";
import { initSocket } from "./websockets/socket.js";
import pkg from "signale";

// ✅ Instancias y configuración
const { Signale } = pkg;
const logger = new Signale({ scope: "Main" });

const PORT = envs.PORT || 3000;

// 🚀 Entidades principales (opcional si las usás para inicialización manual)
import { Profesor } from "./module/profesor/entity/profesor.entity.js";
import { Alumno } from "./module/alumno/entity/alumno.entity.js";
import { Materia } from "./module/materia/entity/materia.entity.js";
import { Tarea } from "./module/tarea/entity/tarea.entity.js";
import { AlumnoMateria } from "./module/alumno_materia/entity/alumno_materia.entity.js";

// 🧠 Función principal
const main = async () => {
  try {
    // 1️⃣ Inicializar conexión con la base de datos
    await AppDataSource.initialize();
    logger.success("✅ Conectado a la base de datos");

    // 2️⃣ Crear servidor HTTP
    const server = http.createServer(app);

    // 3️⃣ Inicializar Socket.IO
    const io = initSocket(server);
    app.set("io", io);

    // 4️⃣ Iniciar el servidor
    server.listen(PORT, () => {
      logger.start(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    // 5️⃣ (Opcional) Mensaje de estado
    logger.info("📡 WebSocket inicializado correctamente");
  } catch (error) {
    logger.error("❌ No se pudo conectar a la base de datos");
    logger.fatal(error);
    process.exit(1); // 👈 Termina el proceso si hay error crítico
  }
};

// 🔹 Ejecutar
main();
