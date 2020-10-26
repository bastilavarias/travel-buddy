import genericService from "./service";
import { Request, Response } from "express";

const genericController = {
  async fetchNationalities(_request: Request, response: Response) {
    try {
      const nationalities = await genericService.fetchNationalities();
      response.status(200).json(nationalities);
    } catch (errors) {
      response.status(400).json(errors);
    }
  },

  async fetchSexes(_request: Request, response: Response) {
    try {
      const sexes = await genericService.fetchSexes();
      response.status(200).json(sexes);
    } catch (errors) {
      response.status(400).json(errors);
    }
  },

  async fetchDestinations(_request: Request, response: Response) {
    try {
      const sexes = await genericService.fetchDestinations();
      response.status(200).json(sexes);
    } catch (errors) {
      response.status(400).json(errors);
    }
  },
};

export default genericController;
