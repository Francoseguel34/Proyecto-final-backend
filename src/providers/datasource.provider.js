import { DataSource } from "typeorm";
import { envs } from '../configuration/envs.js';

const AppDataSource = new DataSource({
    type: 'mysql', // DB que usamos
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASS,
    database: envs.DATABASE,
    synchronize: true,
    logging: false,
    entities: [],
});

export default AppDataSource;