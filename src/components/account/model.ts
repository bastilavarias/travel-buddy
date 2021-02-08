import Account from "../../database/entities/Account";
import {
  IAccountModelSaveDetailsPayload,
  IAccountRawDetails,
  IAccountSoftDetails,
} from "./typeDefs";
import AccountType from "../../database/entities/AccountType";
import { getRepository } from "typeorm";
import TransactionTourGuideReview from "../../database/entities/TransactionTourGuideReview";

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
          `"isVerified"`,
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

  async getTourGuideRecord(id: number): Promise<Account> {
    const tourGuide = await this.getDetailsByID(id);
    const averageResult = await getRepository(TransactionTourGuideReview)
      .createQueryBuilder("tour_guide")
      .select("AVG(tour_guide.rating)", "average")
      .where(`tour_guide."accountId" = :id`, { id })
      .getRawOne();
    //@ts-ignore
    tourGuide.rating = parseFloat(averageResult.average.toFixed(1)) || 0.0;
    return tourGuide!;
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

  async updateDetails(
    accountID: number,
    input: IAccountModelSaveDetailsPayload
  ): Promise<Account> {
    const { email, accountTypeID } = input;
    await Account.update(
      { id: accountID },
      {
        email,
        type: { id: accountTypeID },
      }
    );
    return this.getDetailsByID(accountID);
  },

  async updatePassword(accountID: number, password: string): Promise<Account> {
    await Account.update(
      { id: accountID },
      {
        password,
      }
    );
    return this.getDetailsByID(accountID);
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
        `"isVerified"`,
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

  async searchTourGuides(query: string): Promise<Account[]> {
    const gotTourGuides = await getRepository(Account)
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.profile", "profile")
      .leftJoinAndSelect("profile.image", "profile_image")
      .where("account.email like :query", { query: `%${query}%` })
      .orWhere(`profile."firstName" like :query`, { query: `%${query}%` })
      .orWhere(`profile."lastName" like :query`, { query: `%${query}%` })
      .getMany();
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
