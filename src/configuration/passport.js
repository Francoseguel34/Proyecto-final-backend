import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import AppDataSource from "../providers/datasource.provider.js";
import { envs } from "./envs.js";
import { profesorEntity } from "../module/profesor/entity/profesor.entity.js";
import { alumnoEntity } from "../module/alumno/entity/alumno.entity.js";

const profesorRepo = AppDataSource.getRepository(profesorEntity);
const alumnoRepo = AppDataSource.getRepository(alumnoEntity);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envs.JWT_SECRET
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      //ID de Profesor o Alumno
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
