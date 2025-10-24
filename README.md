# 🏫 Proyecto Final - Backend (Gestión Académica)

Este es el backend para una plataforma de **gestión académica** que permite a **Profesores y Alumnos** administrar materias, tareas y entregas. El proyecto está construido con **Node.js**, **Express**, **TypeORM** y utiliza **autenticación JWT** con **Passport** para la seguridad.

---

## ✨ Características Principales

- 👥 **Gestión de Usuarios**: Registro y autenticación (Login) para Profesores y Alumnos.  
- 🔐 **Autenticación JWT + Passport**: Rutas privadas protegidas.  
- 📚 **Gestión Académica (CRUDs)**:
  - Materias  
  - Tareas  
  - Matrículas (relación Alumno ↔ Materia)
- ✅ **Validación de Datos**: DTOs con **Joi**.  
- 📎 **Subida de Archivos**: Entregas de tareas con **Multer**.  
- 🔔 **Notificaciones en Tiempo Real** con **Socket.IO**:
  - Al crear una nueva tarea.  
  - Al entregar una tarea.  
- ⚙️ **Configuración Segura**: Variables de entorno validadas con **Joi** y **dotenv**.

---

## 🛠️ Tecnologías Utilizadas


## Dependencias instaladas
npm install express typeorm mysql2 passport passport-jwt jsonwebtoken dotenv joi reflect-metadata nodemon cors

| Tecnología | Descripción |
|-------------|--------------|
| **Node.js** | Entorno de ejecución para JavaScript en el servidor. |
| **Express.js** | Framework minimalista para crear el servidor y manejar rutas. |
| **TypeORM** | ORM que facilita el manejo de entidades y relaciones con MySQL. |
| **MySQL** | Sistema de gestión de bases de datos relacional. |
| **Passport.js** | Middleware para autenticación con JWT. |
| **jsonwebtoken (JWT)** | Manejo seguro de sesiones con tokens. |
| **bcrypt** | Encriptación de contraseñas. |
| **Joi** | Validación de variables de entorno y DTOs. |
| **dotenv** | Carga de variables de entorno desde `.env`. |
| **Multer** | Middleware para subida de archivos (entregas de tareas). |
| **Socket.IO** | Comunicación en tiempo real entre cliente y servidor. |
| **Nodemon** | Reinicio automático del servidor en desarrollo. |

---

## Funcionalidad en Tiempo Real (WebSockets)
El servidor utiliza Socket.IO para notificaciones instantáneas a todos los clientes conectados.

Evento: nueva_tarea

Emisión: Se emite cuando se crea una tarea exitosamente (POST /api/tareas).

Payload: { message: "Nueva tarea creada: [Titulo]", data: { ...objeto de la tarea... } }

Reciben: Todos los clientes conectados.

Evento: tarea_entregada

Emisión: Se emite cuando un alumno marca una tarea como entregada (PUT /api/tareas/:id/entregar).

Payload: { message: "El alumno con ID [ID] entregó la tarea: [Titulo]", data: { ...objeto de la tarea... } }

Reciben: Todos los clientes conectados.

## 🧩 1. Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Francoseguel34/Proyecto-final-backend.git
cd Proyecto-final-backend
