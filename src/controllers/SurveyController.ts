/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;
    const surveysRepository = getCustomRepository(SurveyRepository);
    const survey = surveysRepository.create({
      title, description,
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveyRepository);
    const all = await surveysRepository.find();

    return response.json(all);
  }
}

export { SurveyController };
