/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';
import express from 'express';
import './database/index.ts';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333);
