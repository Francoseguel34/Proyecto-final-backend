import express from 'express';
import { envs } from './configuration/envs.js';

const app = express();

app.use(express.json());

app.set('port', envs.PORT);

app.get('/', (req, res) => {
  res.send('🚀 Servidor funcionando correctamente!');
});


export default app;
