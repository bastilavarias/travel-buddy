import {
  ITransactionServiceFetchAvailableTourGuidesInput,
  ITransactionServiceValidateDateResult,
  TransactionNumber,
} from "./typeDefs";
import transactionModel from "./model";
import accountModel from "../account/model";

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
    input: ITransactionServiceFetchAvailableTourGuidesInput
  ): Promise<ITransactionServiceValidateDateResult> {
    const result = {
      message: "",
      tourGuides: [],
    };
    const fetchedTourGuides = await accountModel.fetchTourGuides();
    // @ts-ignore
    result.tourGuides = await Promise.all(
      fetchedTourGuides.filter(
        async (tourGuide) =>
          await transactionModel.checkTourGuideIfAvailable(
            tourGuide.id,
            input.fromDate,
            input.toDate
          )
      )
    );
    if (result.tourGuides.length === 0)
      result.message = "No available tour guides.";
    return result;
  },
};

export default transactionService;
