import Transaction from "../../database/entities/Transaction";
import { IsTourGuideAvailable } from "./typeDefs";
import { getRepository } from "typeorm";

const transactionModel = {
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
      .select(["transaction.id"])
      .where("tour_guide.id = :tourGuideID", { tourGuideID })
      .andWhere(`transaction."fromDate" BETWEEN :fromDate AND :toDate`, {
        fromDate,
        toDate,
      })
      .orWhere(`transaction."toDate" BETWEEN :fromDate AND :toDate`, {
        fromDate,
        toDate,
      })
      .orWhere(
        `:fromDate BETWEEN transaction."fromDate" AND transaction."toDate"`,
        {
          fromDate,
        }
      )
      .orWhere(
        `:toDate BETWEEN transaction."fromDate" AND transaction."toDate"`,
        {
          toDate,
        }
      )
      .getRawMany();
    return !(raw.length > 1);
  },
};

export default transactionModel;
