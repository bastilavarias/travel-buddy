import Account from "../../database/entities/Account";
import { IAccountModelSaveDetailsInput, IAccountSoftDetails } from "./typeDefs";
import AccountType from "../../database/entities/AccountType";
import { getRepository } from "typeorm";

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
    // @ts-ignore
    delete gotDetails?.password;
    return gotDetails!;
  },

  async getSoftDetails(accountID: number): Promise<IAccountSoftDetails> {
    const gotDetails: IAccountSoftDetails = <IAccountSoftDetails>(
      await getRepository(Account)
        .createQueryBuilder("account")
        .select([
          "id",
          "email",
          `"createdAt"`,
          `"typeId" as "typeID"`,
          `"profileId" as "profileID"`,
        ])
        .where("account.id = :id", { id: accountID })
        .getRawOne()
    );
    gotDetails.type = await this.getType(gotDetails.typeID!);
    delete gotDetails.typeID;
    return gotDetails!;
  },

  async getType(typeID: number): Promise<AccountType> {
    const foundType = await AccountType.findOne(typeID);
    return foundType!;
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
