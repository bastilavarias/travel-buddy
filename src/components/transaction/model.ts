import { IsTourGuideAvailable, ITransactionModelSavePayload } from "./typeDefs";
import { getRepository } from "typeorm";
import Transaction from "../../database/entities/Transaction";
import { ITransactionReviewInput } from "./typeDefs";
import TransactionItineraryPostReview from "../../database/entities/TransactionItineraryPostReview";
import TransactionTourGuideReview from "../../database/entities/TransactionTourGuideReview";

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
    return this.get(savedTransaction.id);
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

  async get(transactionID: number): Promise<Transaction> {
    const gotDetails = await Transaction.findOne(transactionID, {
      relations: [
        "post",
        "post.images",
        "post.days",
        "post.days.activities",
        "client",
        "client.profile",
        "client.profile.image",
        "tourGuide",
        "tourGuide.profile",
        "tourGuide.profile.image",
        "postReview",
        "tourGuideReview",
      ],
    });
    //@ts-ignore
    delete gotDetails?.client.password;
    //@ts-ignore
    delete gotDetails?.tourGuide.password;
    return gotDetails!;
  },

  async getTourGuideSchedule(tourGuideID: number): Promise<Transaction[]> {
    const raw = await getRepository(Transaction)
      .createQueryBuilder("transaction")
      .select(["id"])
      .where(`transaction."tourGuideId" = :tourGuideID`, { tourGuideID })
      .orderBy(`"createdAt"`, "DESC")
      .getRawMany();
    return await Promise.all(raw.map((item) => this.get(item.id)));
  },

  async fetch(): Promise<Transaction[]> {
    const raw = await getRepository(Transaction)
      .createQueryBuilder("transaction")
      .select(["id"])
      .orderBy(`"createdAt"`, "DESC")
      .getRawMany();
    return await Promise.all(raw.map((item) => this.get(item.id)));
  },

  async fetchClientBooking(clientID: number): Promise<Transaction[]> {
    const raw = await getRepository(Transaction)
      .createQueryBuilder("transaction")
      .select(["id"])
      .where(`transaction."clientId" = :clientID`, { clientID })
      .orderBy(`"createdAt"`, "DESC")
      .getRawMany();
    return await Promise.all(raw.map((item) => this.get(item.id)));
  },

  async createItineraryPostReview(
    accountID: number,
    review: ITransactionReviewInput["review"]["itinerary"]
  ): Promise<TransactionItineraryPostReview> {
    return await TransactionItineraryPostReview.create({
      post: { id: review.id },
      author: { id: accountID },
      text: review.text,
      rating: review.rating,
    }).save();
  },

  async createTourGuideReview(
    authorID: number,
    review: ITransactionReviewInput["review"]["tourGuide"]
  ): Promise<TransactionTourGuideReview> {
    return await TransactionTourGuideReview.create({
      account: { id: review.id },
      author: { id: authorID },
      text: review.text,
      rating: review.rating,
    }).save();
  },

  async updateReview(
    transactionID: number,
    postReviewID: number,
    tourGuideReviewID: number
  ): Promise<Transaction> {
    await Transaction.update(
      { id: transactionID },
      {
        postReview: { id: postReviewID },
        tourGuideReview: { id: tourGuideReviewID },
      }
    );
    return await this.get(transactionID);
  },
};

export default transactionModel;
