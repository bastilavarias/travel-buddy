import { Request, Response } from "express";
import transactionService from "./service";

const transactionController = {
  async getTransactionNumber(_: Request, response: Response) {
    try {
      const result = await transactionService.getTransactionNumber();
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },
};

export default transactionController;
