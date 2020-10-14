import { Request, Response } from "express";
import {
  IAuthenticationServiceSignInInput,
  IAuthenticationServiceSignupInput,
} from "./typeDefs";
import authenticationService from "./service";
import utilityService from "../utility/service";

const authenticationController = {
  async signup(request: Request, response: Response) {
    try {
      const input: IAuthenticationServiceSignupInput = request.body;
      const result = await authenticationService.signup(input);
      if (utilityService.checkErrorIfValid(result.error)) throw result.error;
      // @ts-ignore
      delete result.error;
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async signIn(request: Request, response: Response) {
    try {
      const input: IAuthenticationServiceSignInInput = request.body;
      const result = await authenticationService.signIn(input);
      if (utilityService.checkErrorIfValid(result.error)) throw result.error;
      // @ts-ignore
      delete result.error;
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },
};

export default authenticationController;
