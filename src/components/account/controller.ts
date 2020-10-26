import { Request, Response } from "express";
import accountService from "./service";
import { IAccountServiceCreateNewInput } from "./typeDefs";
import utilityService from "../utility/service";

const accountController = {
  async fetchTypes(_request: Request, response: Response) {
    try {
      const sexes = await accountService.fetchTypes();
      response.status(200).json(sexes);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async createNew(request: Request, response: Response) {
    try {
      const input: IAccountServiceCreateNewInput = request.body;
      input.image = request.file;
      const result = await accountService.createNew(input);
      if (utilityService.checkErrorIfValid(result.error)) throw result.error;
      // @ts-ignore
      delete result.error;
      response.status(200).json(result);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  },
};

export default accountController;
