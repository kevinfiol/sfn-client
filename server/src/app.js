import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// middleware
app.use(helmet());
app.use(cors());

// routes
import IndexRoutes from './routes/IndexRoutes.js';
import UserRoutes from './routes/UserRoutes.js';

app.use('/', IndexRoutes);
app.use('/user', UserRoutes);

export default app;