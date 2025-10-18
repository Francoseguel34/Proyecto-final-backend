import app from './app.js';
import { envs } from './configuration/envs.js';
import pkg from 'signale';

const { Signale } = pkg;
import AppDataSource from './providers/datasource.provider.js';

const main = () => {
    const logger = new Signale({ scope: 'Main' })
    
    const port = app.get('port');

    AppDataSource.initialize()
    .then(() => logger.log('Connected to database'))
    .catch(() => logger.log('Unable to connect to database'));

app.listen(envs.PORT, () => {
  console.log(`[Main] » server running on http://localhost:${envs.PORT}`);
});
};


main();