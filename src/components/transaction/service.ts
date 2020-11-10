import {
  ITransactionServiceCheckoutPayload,
  TransactionNumber,
} from "./typeDefs";
import transactionModel from "./model";
import accountModel from "../account/model";
import stripeService from "../stripe/service";
import { IStripeServicePayPayload } from "../stripe/typeDefs";
import itineraryModel from "../itinerary/model";

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

  async fetchAvailableTourGuides(
    fromDate: Date | string,
    toDate: Date | string
  ): Promise<Account[]> {
    const fetchedTourGuides = await accountModel.fetchTourGuides();
    // @ts-ignore
    return await Promise.all(
      fetchedTourGuides.filter(
        async (tourGuide) =>
          await transactionModel.checkTourGuideIfAvailable(
            tourGuide.id,
            fromDate,
            toDate
          )
      )
    );
  },

  async checkout(payload: ITransactionServiceCheckoutPayload) {
    const gotPost = await itineraryModel.getSoftDetails(payload.postID);
    const gotClient = await accountModel.getDetailsByID(payload.clientID);
    const stripeServicePayPayload: IStripeServicePayPayload = {
      amount: payload.payment.amount,
      token: payload.payment.token,
      description: gotPost.name,
      email: gotClient.email,
    };
    await stripeService.pay(stripeServicePayPayload);
  },
};

export default transactionService;
