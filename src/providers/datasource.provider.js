import { DataSource } from "typeorm";
import { envs } from '../configuration/envs.js';
import { profesorEntity } from "../module/profesor/entity/profesor.entity.js";
import { alumnoEntity } from "../module/alumno/entity/alumno.entity.js";
import { materiaEntity } from "../module/materia/entity/materia.entity.js";
import { tareaEntity } from "../module/tarea/entity/tarea.entity.js";


const AppDataSource = new DataSource({
    type: 'mysql', // DB que usamos
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASS,
    database: envs.DATABASE,
    synchronize: true,
    logging: false,
    entities: [profesorEntity, alumnoEntity, materiaEntity, tareaEntity],
});

export default AppDataSource;