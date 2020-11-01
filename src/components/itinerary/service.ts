import {
  IItineraryPostDayInput,
  IItineraryPostModelSaveDayInput,
  IItineraryPostModelSaveDetails,
  IItineraryPostModelSaveImageInput,
  IItineraryPostModelUpdateDetails,
  IItineraryPostServiceCreateInput,
  IItinerarySoftDetails,
} from "./typeDefs";
import itineraryModel from "./model";
import cloudinaryService from "../cloudinary/service";
import ItineraryPost from "../../database/entities/ItineraryPost";

const itineraryService = {
  async createNew(
    postID: number,
    input: IItineraryPostServiceCreateInput
  ): Promise<IItinerarySoftDetails> {
    const updateDetailsInput: IItineraryPostModelUpdateDetails = {
      name: input.name,
      description: input.description,
      pax: input.pax,
    };
    await itineraryModel.updateDetails(postID, updateDetailsInput);
    await this.addDays(postID, input.days);
    return await itineraryModel.getSoftDetails(postID);
  },

  async addDays(postID: number, days: IItineraryPostDayInput[]) {
    await Promise.all(
      days.map(async (item) => {
        const saveDayInput: IItineraryPostModelSaveDayInput = {
          postID,
          destination: item.destination,
          day: item.day,
          transportation: item.transportation,
          lodging: item.lodging,
        };
        const savedDay = await itineraryModel.saveDay(saveDayInput);
        await Promise.all(
          item.activities.map(
            async (activity) =>
              await itineraryModel.saveDayActivity(savedDay.id, activity)
          )
        );
      })
    );
  },

  async uploadImages(images: Express.Multer.File[]): Promise<ItineraryPost> {
    const saveDetailsInput: IItineraryPostModelSaveDetails = {
      name: "",
      description: "",
      pax: 0,
    };
    const savedDetails = await itineraryModel.saveDetails(saveDetailsInput);
    await Promise.all(
      images.map(async (image) => {
        const folderPath = "posts";
        const uploadedImageMeta = await cloudinaryService.upload(
          image,
          folderPath
        );
        const saveImageInput: IItineraryPostModelSaveImageInput = {
          url: uploadedImageMeta.url,
          publicID: uploadedImageMeta.publicID,
          fileName: uploadedImageMeta.fileName,
          data: image,
        };
        await itineraryModel.saveImage(savedDetails.id, saveImageInput);
      })
    );
    return savedDetails;
  },

  async fetch(): Promise<IItinerarySoftDetails[]> {
    return await itineraryModel.fetch();
  },
};

export default itineraryService;
