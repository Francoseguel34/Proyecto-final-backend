// test socket para comprobar el funcionamiento de socket
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado al servidor de Socket.IO");
});

//crear tarea
socket.on("nueva_tarea", (payload) => {
  console.log("📢 Notificación:", payload.message);
  console.log("🧾 Datos:", payload.data);
});

// entrega de tarea
socket.on("tarea_entregada", (payload) => {
  console.log("📬 Tarea entregada:", payload.message);
  console.log("📄 Detalles:", payload.data);
});
