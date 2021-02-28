/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, surveyId } = request.body;
    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);
    const user = await userRepository.findOne({ email });
    const survey = await surveyRepository.findOne({ id: surveyId });
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    if (!user) {
      throw new AppError('Survey does not exists');
    }

    if (!survey) {
      throw new AppError('Survey does not exists');
    }

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey'],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id: survey.id,
    });

    await surveyRepository.save(surveyUser);
    variables.id = surveyUser.id;
    await SendMailService.execute(email, survey.title, variables, npsPath);
    return response.json(surveyUser);
  }
}

export { SendMailController };
