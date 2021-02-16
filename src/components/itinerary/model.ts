import {
  IItineraryPostModelSaveDayInput,
  IItineraryPostModelSaveDetails,
  IItineraryPostModelSaveImageInput,
  IItineraryPostModelUpdateDetails,
  IItinerarySoftDetails,
} from "./typeDefs";
import ItineraryPostDayActivity from "../../database/entities/ItineraryPostDayActivity";
import ItineraryPostDay from "../../database/entities/ItineraryPostDay";
import ItineraryPost from "../../database/entities/ItineraryPost";
import ItineraryPostImage from "../../database/entities/ItineraryPostImage";
import { getRepository } from "typeorm";
import ItineraryPostInquiry from "../../database/entities/ItineraryPostInquiry";
import ItineraryPostInquiryReply from "../../database/entities/ItineraryPostInquiryReply";
import TransactionItineraryPostReview from "../../database/entities/TransactionItineraryPostReview";

const itineraryModel = {
  async saveDetails(
    input: IItineraryPostModelSaveDetails
  ): Promise<ItineraryPost> {
    return await ItineraryPost.create(input).save();
  },

  async saveImage(postID: number, input: IItineraryPostModelSaveImageInput) {
    const { url, publicID } = input;
    await ItineraryPostImage.create({
      post: { id: postID },
      url,
      publicID,
    }).save();
  },

  async saveDay(
    input: IItineraryPostModelSaveDayInput
  ): Promise<ItineraryPostDay> {
    const { postID, destination, day, lodging, transportation } = input;
    return await ItineraryPostDay.create({
      post: { id: postID },
      destination,
      day,
      lodging,
      transportation,
    }).save();
  },

  async saveDayActivity(dayID: number, activity: string) {
    await ItineraryPostDayActivity.create({
      day: { id: dayID },
      name: activity,
    }).save();
  },

  async createInquiry(
    postID: number,
    accountID: number,
    message: string
  ): Promise<ItineraryPostInquiry> {
    const inquiry = await ItineraryPostInquiry.create({
      post: { id: postID },
      author: { id: accountID },
      message,
    }).save();
    return await this.getInquiryItem(inquiry.id);
  },

  async createInquiryReply(
    inquiryID: number,
    accountID: number,
    message: string
  ): Promise<ItineraryPostInquiryReply> {
    const reply = await ItineraryPostInquiryReply.create({
      inquiry: { id: inquiryID },
      author: { id: accountID },
      message,
    }).save();
    return await this.getInquiryReplyItem(reply.id);
  },

  async getInquiryItem(id: number): Promise<ItineraryPostInquiry> {
    const inquiry = await ItineraryPostInquiry.findOne(id, {
      relations: [
        "author",
        "author.profile",
        "author.profile.image",
        "replies",
        "replies.author",
        "replies.author.profile",
        "replies.author.profile.image",
      ],
    }).then((item) => {
      // @ts-ignore
      delete item.author.password;
      return item;
    });
    return inquiry!;
  },

  async getInquiryReplyItem(id: number): Promise<ItineraryPostInquiryReply> {
    const reply = await ItineraryPostInquiryReply.findOne(id, {
      relations: ["author", "author.profile", "author.profile.image"],
    }).then((item) => {
      // @ts-ignore
      delete item.author.password;
      return item;
    });
    return reply!;
  },

  async getInquiries(
    postID: number,
    skip: number
  ): Promise<ItineraryPostInquiry[]> {
    const result = await getRepository(ItineraryPostInquiry)
      .createQueryBuilder("inquiry")
      .select(["id"])
      .where(`inquiry."postId" = :postID`, { postID })
      .orderBy(`inquiry."createdAt"`, "DESC")
      .skip(skip)
      .take(5)
      .getRawMany();
    return await Promise.all(
      result.map((item) => this.getInquiryItem(item.id))
    );
  },

  async getReviews(
    postID: number,
    skip: number
  ): Promise<TransactionItineraryPostReview[]> {
    const result = await getRepository(TransactionItineraryPostReview)
      .createQueryBuilder("preview")
      .select(["id"])
      .where(`preview."postId" = :postID`, { postID })
      .orderBy(`preview."createdAt"`, "DESC")
      .skip(skip)
      .take(5)
      .getRawMany();
    return await Promise.all(result.map((item) => this.getReview(item.id)));
  },

  async getReview(id: number): Promise<TransactionItineraryPostReview> {
    const review = await TransactionItineraryPostReview.findOne(id, {
      relations: ["author", "author.profile", "author.profile.image"],
    }).then((review) => {
      // @ts-ignore
      delete review.author.password;
      return review;
    });
    return review!;
  },

  async fetch(): Promise<IItinerarySoftDetails[]> {
    const isDeleted = false;
    const raw = await getRepository(ItineraryPost)
      .createQueryBuilder("itinerary")
      .select(["id"])
      .where(`itinerary."isDeleted" = :isDeleted`, { isDeleted })
      .orderBy(`itinerary."createdAt"`, "ASC")
      .getRawMany();
    return await Promise.all(raw.map((item) => this.getSoftDetails(item.id)));
  },

  async getSoftDetails(postID: number): Promise<IItinerarySoftDetails> {
    // @ts-ignore
    const foundDetails: IItinerarySoftDetails = await ItineraryPost.findOne(
      postID
    );
    foundDetails.images = await this.getImagesSoftDetails(postID);
    foundDetails.days = await this.getDays(postID);
    // @ts-ignore
    foundDetails.reviewsCount = 999;
    // @ts-ignore
    foundDetails.transactionCount = 999;
    // @ts-ignore
    foundDetails.rating = 4.5;
    return foundDetails;
  },

  async getImagesSoftDetails(postID: number): Promise<ItineraryPostImage[]> {
    return await getRepository(ItineraryPostImage)
      .createQueryBuilder("image")
      .select(["id", "url", `"publicID"`])
      .where(`image."postId" = :id`, { id: postID })
      .getRawMany();
  },

  async getDays(postID: number): Promise<ItineraryPostDay[]> {
    return await ItineraryPostDay.find({
      where: { post: { id: postID } },
      relations: ["activities"],
    });
  },

  async updateDetails(
    postID: number,
    input: IItineraryPostModelUpdateDetails
  ): Promise<IItinerarySoftDetails> {
    const { name, description, pax, price } = input;
    await ItineraryPost.update(postID, { name, description, pax, price });
    return await this.getSoftDetails(postID);
  },

  async updateDeleteStatus(
    postID: number,
    status: boolean
  ): Promise<IItinerarySoftDetails> {
    await ItineraryPost.update(postID, { isDeleted: status });
    return await this.getSoftDetails(postID);
  },

  async updateActiveStatus(
    postID: number,
    status: boolean
  ): Promise<IItinerarySoftDetails> {
    await ItineraryPost.update(postID, { isActive: status });
    return await this.getSoftDetails(postID);
  },

  async deleteDays(postID: number) {
    await ItineraryPostDay.delete({ post: { id: postID } });
  },

  async deleteImages(postID: number) {
    await ItineraryPostImage.delete({ post: { id: postID } });
  },
};

export default itineraryModel;
