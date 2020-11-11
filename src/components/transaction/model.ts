import { IsTourGuideAvailable, ITransactionModelSavePayload } from "./typeDefs";
import { getRepository } from "typeorm";
import Transaction from "../../database/entities/Transaction";

const transactionModel = {
  async save(payload: ITransactionModelSavePayload): Promise<Transaction> {
    const {
      fromDate,
      toDate,
      postID,
      clientID,
      tourGuideID,
      customNumber,
    } = payload;
    const savedTransaction = await Transaction.create({
      customNumber,
      fromDate,
      toDate,
      post: { id: postID },
      client: { id: clientID },
      tourGuide: { id: tourGuideID },
    }).save();
    return this.getSoftDetails(savedTransaction.id);
  },

  async getCount(): Promise<Number> {
    return await Transaction.count();
  },

  async checkTourGuideIfAvailable(
    tourGuideID: number,
    fromDate: Date | string,
    toDate: Date | string
  ): Promise<IsTourGuideAvailable> {
    const raw = await getRepository(Transaction)
      .createQueryBuilder("transaction")
      .leftJoinAndSelect("transaction.tourGuide", "tour_guide")
      .select(["tour_guide.id as id"])
      .where("tour_guide.id = :tourGuideID", { tourGuideID })
      .andWhere(`transaction."fromDate" BETWEEN :fromDate AND :toDate`, {
        fromDate,
        toDate,
      })
      .orWhere(`transaction."toDate" BETWEEN :fromDate AND :toDate`, {
        fromDate,
        toDate,
      })
      .getRawMany();
    return raw.length === 0;
  },

  async getSoftDetails(transactionID: number): Promise<Transaction> {
    const gotDetails = await Transaction.findOne(transactionID, {
      relations: [
        "post",
        "client",
        "client.profile",
        "client.profile.image",
        "tourGuide",
        "tourGuide.profile",
        "tourGuide.profile.image",
      ],
    });
    //@ts-ignore
    delete gotDetails?.client.password;
    //@ts-ignore
    delete gotDetails?.tourGuide.password;
    return gotDetails!;
  },

  async fetch(): Promise<Transaction[]> {
    const raw = await getRepository(Transaction)
      .createQueryBuilder("transaction")
      .select(["id"])
      .orderBy(`"createdAt"`, "DESC")
      .getRawMany();
    return await Promise.all(raw.map((item) => this.getSoftDetails(item.id)));
  },

  async fetchClientBooking(clientID: number): Promise<Transaction[]> {
    const raw = await getRepository(Transaction)
      .createQueryBuilder("transaction")
      .select(["id"])
      .where(`transaction."clientId" = :clientID`, { clientID })
      .orderBy(`"createdAt"`, "DESC")
      .getRawMany();
    return await Promise.all(raw.map((item) => this.getSoftDetails(item.id)));
  },
};

export default transactionModel;
