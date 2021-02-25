/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';

const router = Router();
const userController:any = new UserController();
const surveyController:any = new SurveyController();

router.post('/users', userController.create);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

export { router };
