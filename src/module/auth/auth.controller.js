import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { envs } from "../../configuration/envs.js";
import { AppDataSource } from "../../providers/datasource.provider.js";
import { Profesor } from "../profesor/entity/profesor.entity.js";
import { Alumno } from "../alumno/entity/alumno.entity.js";

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
    const payload = { id: user.id, email: user.email, role };
    const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "1h" });

    // Respuesta sin la contraseña
    const { password: _, ...userSinClave } = user;

    return res.status(200).json({
      ok: true,
      message: "Login exitoso",
      metadata: { user: { ...userSinClave, role }, token },
    });
  } catch (error) {
    console.error("💥 Error en login:", error);
    res.status(500).json({
      message: "Error al autenticar usuario",
      error: error.message,
    });
  }
};
