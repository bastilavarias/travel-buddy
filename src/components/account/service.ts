import accountModel from "./model";
import AccountType from "../../database/entities/AccountType";

const accountService = {
  async fetchTypes(): Promise<AccountType[]> {
    return await accountModel.fetchTypes();
  },
};

export default accountService;
