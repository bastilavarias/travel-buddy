import Account from "../../database/entities/Account";
import {
  IAccountModelSaveDetailsPayload,
  IAccountRawDetails,
  IAccountSoftDetails,
} from "./typeDefs";
import AccountType from "../../database/entities/AccountType";
import { getRepository } from "typeorm";

const accountModel = {
  async getPartialDetailsByEmail(email: string): Promise<Account> {
    const gotDetails = await Account.findOne({
      where: { email },
      relations: ["profile"],
    });
    return gotDetails!;
  },

  async getDetailsByID(accountID: number): Promise<Account> {
    const gotDetails = await Account.findOne({
      where: { id: accountID },
      relations: ["profile", "profile.image", "type"],
    });
    // @ts-ignore
    delete gotDetails?.password;
    return gotDetails!;
  },

  async getGenericDetails(accountID: number): Promise<IAccountSoftDetails> {
    const gotDetails: IAccountSoftDetails = <IAccountSoftDetails>(
      await getRepository(Account)
        .createQueryBuilder("account")
        .select([
          "id",
          "email",
          `"createdAt"`,
          `"typeId" as "typeID"`,
          `"profileId" as "profileID"`,
          `"isDeleted"`,
          `"isActive"`,
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

  async saveDetails(input: IAccountModelSaveDetailsPayload): Promise<Account> {
    const { email, password, accountTypeID, profileID, isVerified } = input;
    const gotDetails = await Account.create({
      email,
      password,
      isVerified,
      profile: { id: profileID },
      type: { id: accountTypeID },
    }).save();
    return this.getDetailsByID(gotDetails.id);
  },

  async fetchTypes(): Promise<AccountType[]> {
    return await AccountType.find();
  },

  async fetchRawDetails(): Promise<IAccountRawDetails[]> {
    return await getRepository(Account)
      .createQueryBuilder("account")
      .select([
        "id",
        "email",
        "password",
        `"createdAt"`,
        `"profileId" as "profileID"`,
        `"isDeleted"`,
        `"isActive"`,
        `"typeId" as "typeID"`,
      ])
      .where(`account."isDeleted" = :isDeleted`, { isDeleted: false })
      .orderBy(`account."createdAt"`, "DESC")
      .getRawMany();
  },

  async fetchTourGuides(): Promise<Account[]> {
    const gotTourGuides = await Account.find({
      where: {
        type: { id: 2 },
        isActive: true,
        isDeleted: false,
        isVerified: true,
      },
      relations: ["profile", "profile.image", "type"],
    });
    return gotTourGuides.map((tourGuide) => {
      //@ts-ignore
      delete tourGuide.password;
      //@ts-ignore
      delete tourGuide.profile.image.data;
      return tourGuide;
    });
  },

  async updateActiveStatus(
    accountID: number,
    status: boolean
  ): Promise<IAccountSoftDetails> {
    await Account.update({ id: accountID }, { isActive: status });
    return await this.getGenericDetails(accountID);
  },

  async updateDeleteStatus(
    accountID: number,
    status: boolean
  ): Promise<IAccountSoftDetails> {
    await Account.update({ id: accountID }, { isDeleted: status });
    return await this.getGenericDetails(accountID);
  },

  async updateVerifiedStatus(accountID: number): Promise<IAccountSoftDetails> {
    await Account.update({ id: accountID }, { isVerified: true });
    return await this.getGenericDetails(accountID);
  },
};

export default accountModel;
