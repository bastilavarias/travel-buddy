import Account from "../../database/entities/Account";
import { AccountModelSaveDetailsInput } from "./typeDefs";

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

  async saveDetails(input: AccountModelSaveDetailsInput): Promise<Account> {
    const { email, password, type, profileID } = input;
    const gotDetails = await Account.create({
      email,
      password,
      type,
      profile: { id: profileID },
    }).save();
    return this.getDetailsByID(gotDetails.id);
  },
};

export default accountModel;
