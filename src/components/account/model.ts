import Account from "../../database/entities/Account";
import { IAccountModelSaveDetailsInput } from "./typeDefs";
import AccountType from "../../database/entities/AccountType";

const accountModel = {
  async getDetailsByEmail(email: string): Promise<Account> {
    const gotDetails = await Account.findOne({
      where: { email },
      relations: ["profile"],
    });
    return gotDetails!;
  },

  async getDetailsByID(accountID: number): Promise<Account> {
    const gotDetails = await Account.findOne({
      where: { id: accountID },
      relations: ["profile"],
    });
    return gotDetails!;
  },

  async saveDetails(input: IAccountModelSaveDetailsInput): Promise<Account> {
    const { email, password, accountTypeID, profileID } = input;
    const gotDetails = await Account.create({
      email,
      password,
      profile: { id: profileID },
      type: { id: accountTypeID },
    }).save();
    return this.getDetailsByID(gotDetails.id);
  },

  async fetchTypes(): Promise<AccountType[]> {
    return await AccountType.find();
  },
};

export default accountModel;
