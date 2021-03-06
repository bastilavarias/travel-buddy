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
import ItineraryPostInquiry from "../../database/entities/ItineraryPostInquiry";
import TransactionItineraryPostReview from "../../database/entities/TransactionItineraryPostReview";

const itineraryService = {
  async createNew(
    postID: number,
    input: IItineraryPostServiceCreateInput
  ): Promise<IItinerarySoftDetails> {
    const updateDetailsInput: IItineraryPostModelUpdateDetails = {
      name: input.name,
      description: input.description,
      pax: input.pax,
      price: input.price,
    };
    await itineraryModel.updateDetails(postID, updateDetailsInput);
    await this.addDays(postID, input.days);
    return await itineraryModel.getSoftDetails(postID);
  },

  async update(
    postID: number,
    input: IItineraryPostServiceCreateInput
  ): Promise<IItinerarySoftDetails> {
    const updateDetailsInput: IItineraryPostModelUpdateDetails = {
      name: input.name,
      description: input.description,
      pax: input.pax,
      price: input.price,
    };
    await itineraryModel.updateDetails(postID, updateDetailsInput);
    await itineraryModel.deleteDays(postID);
    await this.addDays(postID, input.days);
    return await itineraryModel.getSoftDetails(postID);
  },

  async createInquiry(postID: number, accountID: number, message: string) {
    return await itineraryModel.createInquiry(postID, accountID, message);
  },

  async createInquiryReply(
    inquiryID: number,
    accountID: number,
    message: string
  ) {
    return await itineraryModel.createInquiryReply(
      inquiryID,
      accountID,
      message
    );
  },

  async getInquiries(
    postID: number,
    skip: number
  ): Promise<ItineraryPostInquiry[]> {
    return await itineraryModel.getInquiries(postID, skip);
  },

  async getReviews(
    postID: number,
    skip: number
  ): Promise<TransactionItineraryPostReview[]> {
    return await itineraryModel.getReviews(postID, skip);
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
      price: 0,
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

  async updateImages(
    postID: number,
    images: Express.Multer.File[]
  ): Promise<IItinerarySoftDetails> {
    const gotImages = await itineraryModel.getImagesSoftDetails(postID);
    gotImages.map(
      async (image) => await cloudinaryService.delete(image.publicID)
    );
    await itineraryModel.deleteImages(postID);
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
        await itineraryModel.saveImage(postID, saveImageInput);
      })
    );

    return await this.getSoftDetails(postID);
  },

  async fetch(): Promise<IItinerarySoftDetails[]> {
    return await itineraryModel.fetch();
  },

  async getSoftDetails(postID: number): Promise<IItinerarySoftDetails> {
    return await itineraryModel.getSoftDetails(postID);
  },

  async delete(postID: number): Promise<IItinerarySoftDetails> {
    const deletedStatus = true;
    return await itineraryModel.updateDeleteStatus(postID, deletedStatus);
  },

  async disable(postID: number): Promise<IItinerarySoftDetails> {
    const disableStatus = false;
    return await itineraryModel.updateActiveStatus(postID, disableStatus);
  },

  async enable(postID: number): Promise<IItinerarySoftDetails> {
    const enableStatus = true;
    return await itineraryModel.updateActiveStatus(postID, enableStatus);
  },
};

export default itineraryService;
