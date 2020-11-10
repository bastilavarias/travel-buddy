import { Request, Response } from "express";
import transactionService from "./service";
import { ITransactionServiceFetchAvailableTourGuidesInput } from "./typeDefs";

const transactionController = {
  async getTransactionNumber(_: Request, response: Response) {
    try {
      const result = await transactionService.getTransactionNumber();
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async fetchAvailableTourGuides(request: Request, response: Response) {
    try {
      const input: ITransactionServiceFetchAvailableTourGuidesInput = {
        fromDate: request.params.fromDate || "",
        toDate: request.params.toDate || "",
      };
      const fetchedTourGuides = await transactionService.fetchAvailableTourGuides(
        input
      );
      response.status(200).json(fetchedTourGuides);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  },
};

export default transactionController;
