/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();
const userController:any = new UserController();
router.post('/users', userController.create);

export { router };
