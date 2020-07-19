import config from './config.js';
import app from './src/app.js';

app.listen(config.port, () => console.log(`Listening on ${config.port}...`));