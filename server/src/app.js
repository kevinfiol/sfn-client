import polka from 'polka';
import send from '@polka/send-type';
import helmet from 'helmet';
import cors from 'cors';

const app = polka();

// middleware
app.use(helmet());
app.use(cors());
app.use((_, res, next) => {
    res.send = send.bind(null, res);
    next();
});

// routes
import IndexRoutes from './routes/IndexRoutes.js';
import UserRoutes from './routes/UserRoutes.js';

app.use('/user', UserRoutes);
app.use('/', IndexRoutes);

export default app;