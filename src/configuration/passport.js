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
      // ⚡ Obtener los repositorios dentro del callback
      const profesorRepo = AppDataSource.getRepository(Profesor);
      const alumnoRepo = AppDataSource.getRepository(Alumno);

      // Buscar al usuario por ID en ambas tablas
      const user =
        (await profesorRepo.findOneBy({ id: payload.id })) ||
        (await alumnoRepo.findOneBy({ id: payload.id }));

      if (!user) {
        return done(null, false);
      }

      // Eliminar el campo password antes de devolverlo
      const { password, ...userSinClave } = user;

      return done(null, userSinClave);
    } catch (err) {
      console.error("Error en estrategia JWT:", err);
      return done(err, false);
    }
  })
);

export default passport;
