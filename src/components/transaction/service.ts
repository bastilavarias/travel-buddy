import {
  ITransactionModelSavePayload,
  ITransactionServiceCheckoutPayload,
  TransactionNumber,
} from "./typeDefs";
import transactionModel from "./model";
import accountModel from "../account/model";
import stripeService from "../stripe/service";
import { IStripeServicePayPayload } from "../stripe/typeDefs";
import itineraryModel from "../itinerary/model";
import Transaction from "../../database/entities/Transaction";
import { ITransactionReviewInput } from "../transaction/typeDefs";

const transactionService = {
  async getTransactionNumber(): Promise<{
    transactionNumber: TransactionNumber;
  }> {
    const transactionsCount = await transactionModel.getCount();
    let customTransactionNumber = "";
    if (transactionsCount === 0) customTransactionNumber = "TRANSACTION-00000";
    if (transactionsCount >= 1 && transactionsCount <= 9)
      customTransactionNumber = `TRANSACTION-0000${transactionsCount}`;
    if (transactionsCount >= 10 && transactionsCount <= 99)
      customTransactionNumber = `TRANSACTION-000${transactionsCount}`;
    if (transactionsCount >= 100 && transactionsCount <= 999)
      customTransactionNumber = `TRANSACTION-00${transactionsCount}`;
    if (transactionsCount >= 1000 && transactionsCount <= 9999)
      customTransactionNumber = `TRANSACTION-0${transactionsCount}`;
    if (transactionsCount >= 10000 && transactionsCount <= 99999)
      customTransactionNumber = `TRANSACTION-${transactionsCount}`;
    return {
      transactionNumber: customTransactionNumber,
    };
  },

  async getClientBooking(transactionID: number): Promise<Transaction> {
    return transactionModel.get(transactionID);
  },

  async fetchAvailableTourGuides(
    fromDate: Date | string,
    toDate: Date | string
  ): Promise<Account[]> {
    const fetchedTourGuides = await accountModel.fetchTourGuides();
    let filteredTourGuides: any[] = [];
    for (const tourGuide of fetchedTourGuides) {
      const isAvailable = await transactionModel.checkTourGuideIfAvailable(
        tourGuide.id,
        fromDate,
        toDate
      );
      if (isAvailable) {
        filteredTourGuides.push(tourGuide);
      }
    }
    return filteredTourGuides;
  },

  async checkout(
    payload: ITransactionServiceCheckoutPayload
  ): Promise<Transaction> {
    const gotPost = await itineraryModel.getSoftDetails(payload.postID);
    const gotClient = await accountModel.getDetailsByID(payload.clientID);
    const stripeServicePayPayload: IStripeServicePayPayload = {
      amount: gotPost.price,
      token: payload.payment.token,
      description: gotPost.name,
      email: gotClient.email,
    };
    await stripeService.pay(stripeServicePayPayload);
    const gotTransactionNumber = await this.getTransactionNumber();
    const transactionModelSavePayload: ITransactionModelSavePayload = {
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      customNumber: gotTransactionNumber.transactionNumber,
      postID: payload.postID,
      clientID: payload.clientID,
      tourGuideID: payload.tourGuideID,
    };
    return await transactionModel.save(transactionModelSavePayload);
  },

  async fetch(): Promise<Transaction[]> {
    return await transactionModel.fetch();
  },

  async fetchClientBookings(clientID: number): Promise<Transaction[]> {
    return await transactionModel.fetchClientBooking(clientID);
  },

  async createReview(input: ITransactionReviewInput): Promise<Transaction> {
    const { transactionID, accountID, review } = input;
    const postReview = await transactionModel.createItineraryPostReview(
      accountID,
      review.itinerary
    );
    const accountReview = await transactionModel.createTourGuideReview(
      accountID,
      review.tourGuide
    );
    return await transactionModel.updateReview(
      transactionID,
      postReview.id,
      accountReview.id
    );
  },
};

export default transactionService;
