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
      const input: IAccountServiceCreateNewInput = {
        firstName: request.body.firstName || "",
        lastName: request.body.lastName || "",
        nationality: request.body.nationality || "",
        email: request.body.email || "",
        birthDate: request.body.birthDate || "",
        sex: request.body.sex || "",
        image: request.file || null,
        typeID: request.body.typeID || null,
      };
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
