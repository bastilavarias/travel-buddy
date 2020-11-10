import { Request, Response } from "express";
import transactionService from "./service";
import { ITransactionServiceCheckoutPayload } from "./typeDefs";

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
      const fromDate = request.params.fromDate || "";
      const toDate = request.params.toDate || "";
      const fetchedTourGuides = await transactionService.fetchAvailableTourGuides(
        fromDate,
        toDate
      );
      response.status(200).json(fetchedTourGuides);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  },

  async checkout(request: Request, response: Response) {
    try {
      const payload: ITransactionServiceCheckoutPayload = {
        fromDate: request.body.fromDate || "",
        toDate: request.body.toDate || "",
        postID: parseInt(request.params.postID) || 0,
        clientID: parseInt(request.params.clientID) || 0,
        tourGuideID: parseInt(request.params.tourGuideID) || 0,
        payment: {
          token: request.params.stripeToken || "",
          amount: parseFloat(request.body.amount) || 0.0,
        },
      };
      const result = await transactionService.checkout(payload);
      response.status(200).json(result);
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  },
};

export default transactionController;