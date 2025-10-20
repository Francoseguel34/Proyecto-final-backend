import jwt from "jsonwebtoken";
import { envs } from "../../configuration/envs.js";
import AppDataSource from "../../providers/datasource.provider.js";
import { profesorEntity } from "../profesor/entity/profesor.entity.js";
import { alumnoEntity } from "../alumno/entity/alumno.entity.js";

// Login de Profesor o Alumno
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const profesorRepo = AppDataSource.getRepository(profesorEntity);
    const alumnoRepo = AppDataSource.getRepository(alumnoEntity);

    const user =
      (await profesorRepo.findOneBy({ email })) ||
      (await alumnoRepo.findOneBy({ email }));

    if (!user || user.password !== password) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    // Payload JWT
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      ok: true,
      message: "Login exitoso",
      metadata: { user: { ...user, password: "***" }, token },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al autenticar", error: error.message });
  }
};
