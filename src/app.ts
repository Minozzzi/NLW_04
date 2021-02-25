/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';
import express from 'express';
import createConnection from './database';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app };
