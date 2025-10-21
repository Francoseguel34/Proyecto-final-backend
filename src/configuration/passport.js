import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AppDataSource } from "../providers/datasource.provider.js";
import { envs } from "./envs.js";

// ✅ Importar las entidades como las exportaste
import { Profesor } from "../module/profesor/entity/profesor.entity.js";
import { Alumno } from "../module/alumno/entity/alumno.entity.js";

const profesorRepo = AppDataSource.getRepository("Profesor");
const alumnoRepo = AppDataSource.getRepository("Alumno");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envs.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // Buscar al usuario por ID en ambas tablas
      const user =
        (await profesorRepo.findOneBy({ id: payload.id })) ||
        (await alumnoRepo.findOneBy({ id: payload.id }));

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
