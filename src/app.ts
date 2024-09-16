import 'reflect-metadata';
import express, { Application } from 'express';
import { setupSwagger } from './swagger';

import { authRouters } from './auth';

const app: Application = express();

app.use(express.json());
app.use('/', authRouters)

setupSwagger(app);

export default app;