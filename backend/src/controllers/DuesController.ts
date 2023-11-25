import { Request, Response, json } from "express";
import fs from 'fs';
import { DuesService } from '../services/DuesService';

class DuesController {
  async getDues(request: Request, response: Response) {
    const duesService = new DuesService();

    const result = await duesService.getDues();

    response.json(result);
  }

  async getDueById(request: Request, response: Response) {
    const { id } = request.params;

    const duesService = new DuesService();

    const result = await duesService.getDueById(parseInt(id));

    response.json(result);
  }

  async updateDue(request: Request, response: Response) {
    const { id } = request.params;
    const { informacoes_complementares } = request.body;

    if (!informacoes_complementares) {
      return response.status(400).json('Invalid params')
    }

    const duesService = new DuesService();

    await duesService.updateDue(Number(id), informacoes_complementares);

    response.json('Due updated');
  }

  async createDue(request: Request, response: Response) {
    const file = request.file;

    if (!file) {
      return response.status(400).json('No file sended.')
    }

    const jsonObject = JSON.parse(fs.readFileSync(file.path, 'utf-8'));

    if (!jsonObject) {
      return response.status(400).json('The object is not accepted.')
    }

    const duesService = new DuesService();

    await duesService.createDue(jsonObject);

    return response.status(201).json('Due created')
  }
}

export { DuesController }