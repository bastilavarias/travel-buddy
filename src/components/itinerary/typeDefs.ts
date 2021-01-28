import { ICloudinaryFileMeta } from "../cloudinary/typeDefs";
import ItineraryPostImage from "../../database/entities/ItineraryPostImage";

interface IItineraryPostBaseInput {
  name: string;
  description: string;
  pax: number;
  price: number;
}

interface IItineraryDayBaseInput {
  day: number;
  transportation: string;
  lodging: string;
}

export interface IItineraryPostServiceCreateInput
  extends IItineraryPostBaseInput {
  days: IItineraryPostDayInput[];
}

export interface IItineraryPostDayInput extends IItineraryDayBaseInput {
  destination: string;
  activities: string[];
}

export interface IItineraryPostModelSaveDayInput
  extends IItineraryDayBaseInput {
  postID: number;
  destination: string;
}

export interface IItineraryPostModelSaveDetails
  extends IItineraryPostBaseInput {}

export interface IItineraryPostModelUpdateDetails
  extends IItineraryPostBaseInput {}

export interface IItineraryPostModelSaveImageInput extends ICloudinaryFileMeta {
  data: any;
}

export interface IItinerarySoftDetails extends IItineraryPostBaseInput {
  id: number;
  createdAt: Date;
  isDeleted: boolean;
  isActive: Boolean;
  days: IItineraryDaySoftDetails[];
  images: ItineraryPostImage[];
}

export interface IItineraryDaySoftDetails extends IItineraryDayBaseInput {
  id: number;
  destination: string;
}

export interface IItineraryPostReviewInput {
  transactionID: number;
  accountID: number;
  review: {
    itinerary: {
      text: string;
      rating: number;
    };
    tourGuide: {
      text: string;
      rating: number;
    };
  };
}
