import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AppDataSource } from "../providers/datasource.provider.js";
import { envs } from "./envs.js";
import { Profesor } from "../module/profesor/entity/profesor.entity.js";
import { Alumno } from "../module/alumno/entity/alumno.entity.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envs.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const profesorRepo = AppDataSource.getRepository(Profesor);
      const alumnoRepo = AppDataSource.getRepository(Alumno);

      let user = null;
      let rol = null;

      // ✅ Verificamos si el token indica el rol
      if (payload.rol === "profesor") {
        user = await profesorRepo.findOneBy({ id: payload.id });
        rol = "profesor";
      } else if (payload.rol === "alumno") {
        user = await alumnoRepo.findOneBy({ id: payload.id });
        rol = "alumno";
      } else {
        // Si el token no trae rol, intentamos detectarlo manualmente
        user = await profesorRepo.findOneBy({ id: payload.id });
        rol = user ? "profesor" : "alumno";
        if (!user) user = await alumnoRepo.findOneBy({ id: payload.id });
      }

      if (!user) return done(null, false);

      const { password, ...userSinClave } = user;

      // 👇 Añadimos el rol al usuario antes de devolverlo
      userSinClave.rol = rol;

      return done(null, userSinClave);
    } catch (err) {
      console.error("Error en estrategia JWT:", err);
      return done(err, false);
    }
  })
);

export default passport;

