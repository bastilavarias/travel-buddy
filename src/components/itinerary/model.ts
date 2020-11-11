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

const itineraryModel = {
  async saveDetails(
    input: IItineraryPostModelSaveDetails
  ): Promise<ItineraryPost> {
    return await ItineraryPost.create(input).save();
  },

  async saveImage(postID: number, input: IItineraryPostModelSaveImageInput) {
    const { url, publicID, data } = input;
    await ItineraryPostImage.create({
      post: { id: postID },
      url,
      publicID,
      data,
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
};

export default itineraryModel;
