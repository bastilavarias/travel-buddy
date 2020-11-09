import Transaction from "../../database/entities/Transaction";

const transactionModel = {
  async getCount(): Promise<Number> {
    return await Transaction.count();
  },
};

export default transactionModel;
