import { ICloudinaryFileMeta } from "../cloudinary/typeDefs";
import ItineraryPostDayDestination from "../../database/entities/ItineraryPostDayDestination";
import ItineraryPostImage from "../../database/entities/ItineraryPostImage";

interface IItineraryPostBaseInput {
  name: string;
  description: string;
  pax: number;
  date: Date;
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
  destination: IItineraryPostDestinationInput;
  activities: string[];
}

export interface IItineraryPostDestinationInput {
  name: string;
  country: string;
}

export interface IItineraryPostModelSaveDayInput
  extends IItineraryDayBaseInput {
  postID: number;
  destinationID: number;
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
  destination: ItineraryPostDayDestination;
}
