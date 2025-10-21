import jwt from "jsonwebtoken";
import { envs } from "../../configuration/envs.js";
import { AppDataSource } from "../../providers/datasource.provider.js"; // ✅ import con llaves
import { Profesor } from "../profesor/entity/profesor.entity.js"; // ✅ nombre correcto
import { Alumno } from "../alumno/entity/alumno.entity.js";       // ✅ nombre correcto

// Login de Profesor o Alumno
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Repositorios correctos
    const profesorRepo = AppDataSource.getRepository("Profesor");
    const alumnoRepo = AppDataSource.getRepository("Alumno");

    // Buscar usuario por email
    const user =
      (await profesorRepo.findOneBy({ email })) ||
      (await alumnoRepo.findOneBy({ email }));

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ ok: false, message: "Credenciales inválidas" });
    }

    // Crear token JWT
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      ok: true,
      message: "Login exitoso",
      metadata: { user: { ...user, password: "***" }, token },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al autenticar", error: error.message });
  }
};
