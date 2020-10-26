import { Request, Response } from "express";
import accountService from "./service";

const accountController = {
  async fetchTypes(_request: Request, response: Response) {
    try {
      const sexes = await accountService.fetchTypes();
      response.status(200).json(sexes);
    } catch (errors) {
      response.status(400).json(errors);
    }
  },
};

export default accountController;
