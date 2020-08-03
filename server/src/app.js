const polka = require('polka');
const send = require('@polka/send-type');
const helmet = require('helmet');
const cors = require('cors');

const app = polka();

// middleware
app.use(helmet());
app.use(cors());
app.use((_, res, next) => {
    res.send = send.bind(null, res);
    next();
});

// routes
const IndexRoutes = require('./routes/IndexRoutes.js');
const UserRoutes = require('./routes/UserRoutes.js');

app.use('/user', UserRoutes);
app.use('/', IndexRoutes);

module.exports = app;