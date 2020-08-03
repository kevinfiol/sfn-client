const config = require('./config.js');
const app = require('./src/app.js');

app.listen(config.port, () => console.log(`Listening on ${config.port}...`));