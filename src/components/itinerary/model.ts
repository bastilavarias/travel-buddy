import {
  IItineraryPostModelSaveDayInput,
  IItineraryPostModelSaveDetails,
  IItineraryPostModelSaveImageInput,
  IItineraryPostModelUpdateDetails,
  IItinerarySoftDetails,
} from "./typeDefs";
import ItineraryPostDayDestination from "../../database/entities/ItineraryPostDayDestination";
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

  async saveDayDestination(
    name: string,
    country: string
  ): Promise<ItineraryPostDayDestination> {
    return await ItineraryPostDayDestination.create({
      name,
      country,
    }).save();
  },

  async saveDay(
    input: IItineraryPostModelSaveDayInput
  ): Promise<ItineraryPostDay> {
    const { postID, destinationID, day, lodging, transportation } = input;
    return await ItineraryPostDay.create({
      post: { id: postID },
      destination: { id: destinationID },
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
      relations: ["destination", "activities"],
    });
  },

  async updateDetails(
    postID: number,
    input: IItineraryPostModelUpdateDetails
  ): Promise<IItinerarySoftDetails> {
    const { name, description, pax, date } = input;
    await ItineraryPost.update(postID, { name, description, pax, date });
    return await this.getSoftDetails(postID);
  },
};

export default itineraryModel;
