import { Request, Response } from "express";
import accountService from "./service";
import { IAccountServiceCreateNewInput } from "./typeDefs";
import utilityService from "../utility/service";

const accountController = {
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

  async update(request: Request, response: Response) {
    try {
      const accountID = parseInt(<string>request.body.accountID);
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
      const result = await accountService.update(accountID, input);
      if (utilityService.checkErrorIfValid(result.error)) throw result.error;
      // @ts-ignore
      delete result.error;
      response.status(200).json(result);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  },

  async updatePassword(request: Request, response: Response) {
    try {
      const accountID = parseInt(<string>request.body.accountID);
      const password = request.body.password;
      const result = await accountService.updatePassword(accountID, password);
      response.status(200).json(result);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  },

  async fetchTypes(_request: Request, response: Response) {
    try {
      const types = await accountService.fetchTypes();
      response.status(200).json(types);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async fetchDetails(_request: Request, response: Response) {
    try {
      const details = await accountService.fetchDetails();
      response.status(200).json(details);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async fetchTourGuides(request: Request, response: Response) {
    try {
      const query = request.query.query || null;
      let tourGuides = null;
      //@ts-ignore
      if (query) tourGuides = await accountService.searchTourGuides(query);
      if (!query) tourGuides = await accountService.fetchTourGuides();
      response.status(200).json(tourGuides);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async getInformation(request: Request, response: Response) {
    try {
      const id = parseInt(request.params.id) || null;
      //@ts-ignore
      const result = await accountService.getInformation(id);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async disable(request: Request, response: Response) {
    try {
      const accountID = parseInt(request.params.accountID);
      const details = await accountService.disable(accountID);
      response.status(200).json(details);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async enable(request: Request, response: Response) {
    try {
      const accountID = parseInt(request.params.accountID);
      const details = await accountService.enable(accountID);
      response.status(200).json(details);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const accountID = parseInt(request.params.accountID);
      const details = await accountService.delete(accountID);
      response.status(200).json(details);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async verify(request: Request, response: Response) {
    try {
      const accountID = parseInt(request.params.accountID);
      const details = await accountService.verify(accountID);
      response.status(200).json(details);
    } catch (error) {
      response.status(400).json(error);
    }
  },
};

export default accountController;
