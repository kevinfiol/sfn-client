import express from 'express';
import helmet from 'helmet';

const app = express();

// middleware
app.use(helmet());

// routes
import IndexRoutes from './routes/IndexRoutes.js';
import UserRoutes from './routes/UserRoutes.js';

app.use('/', IndexRoutes);
app.use('/user', UserRoutes);

export default app;