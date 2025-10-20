import app from './app.js';
import { envs } from './configuration/envs.js';
import pkg from 'signale';
import AppDataSource from './providers/datasource.provider.js';
import "reflect-metadata";
import { DataSource } from "typeorm";

//entidades
import { profesorEntity } from "./module/profesor/entity/profesor.entity.js";
import { alumnoEntity } from "./module/alumno/entity/alumno.entity.js";
import { materiaEntity } from "./module/materia/entity/materia.entity.js";
import { tareaEntity } from "./module/tarea/entity/tarea.entity.js";

const { Signale } = pkg;
const logger = new Signale({ scope: 'Main' });

const main = async () => {
  try {
    await AppDataSource.initialize();
    logger.success('Connected to database');

    app.listen(envs.PORT, () => {
      logger.start(`Server running on http://localhost:${envs.PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to database', error);
  }
};

main();
