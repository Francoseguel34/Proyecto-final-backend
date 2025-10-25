import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { envs } from "../../configuration/envs.js";
import { AppDataSource } from "../../providers/datasource.provider.js";
import { Profesor } from "../profesor/entity/profesor.entity.js";
import { Alumno } from "../alumno/entity/alumno.entity.js";

// Registro (Profesor o Alumno)
export const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    if (!["alumno", "profesor"].includes(rol)) {
      return res.status(400).json({ message: "Rol inválido. Debe ser 'alumno' o 'profesor'" });
    }

    const hash = await bcrypt.hash(password, 10);
    let nuevoUsuario;

    if (rol === "alumno") {
      const alumnoRepo = AppDataSource.getRepository(Alumno);
      nuevoUsuario = alumnoRepo.create({ nombre, apellido, email, password: hash });
      await alumnoRepo.save(nuevoUsuario);
    } else if (rol === "profesor") {
      const profesorRepo = AppDataSource.getRepository(Profesor);
      nuevoUsuario = profesorRepo.create({ nombre, apellido, email, password: hash });
      await profesorRepo.save(nuevoUsuario);
    }

    const { password: _, ...usuarioSinPass } = nuevoUsuario;

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      data: { ...usuarioSinPass, rol }
    });

  } catch (error) {
    console.error("💥 Error en register:", error);
    res.status(500).json({
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
};

// 🔐 Login universal (Profesor o Alumno)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const profesorRepo = AppDataSource.getRepository(Profesor);
    const alumnoRepo = AppDataSource.getRepository(Alumno);

    let user = null;
    let role = null;

    // Buscar profesor
    const profesor = await profesorRepo.findOneBy({ email });
    if (profesor) {
      const validPass = await bcrypt.compare(password, profesor.password);
      if (validPass) {
        user = profesor;
        role = "profesor";
      }
    }

    // Si no es profesor o su contraseña no coincide, probar alumno
    if (!user) {
      const alumno = await alumnoRepo.findOneBy({ email });
      if (alumno) {
        const validPass = await bcrypt.compare(password, alumno.password);
        if (validPass) {
          user = alumno;
          role = "alumno";
        }
      }
    }

    // Si no se encontró usuario válido
    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Credenciales inválidas" });
    }

    // Crear token JWT
    const payload = { id: user.id, email: user.email, rol: role };
    const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...userSinClave } = user;

    return res.status(200).json({
      ok: true,
      message: "Login exitoso",
      metadata: { user: { ...userSinClave, rol: role }, token },
    });
  } catch (error) {
    console.error("💥 Error en login:", error);
    res.status(500).json({
      message: "Error al autenticar usuario",
      error: error.message,
    });
  }
};
