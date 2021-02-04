import { ICloudinaryFileMeta } from "../cloudinary/typeDefs";

export interface IProfileModelSaveDetailsPayload {
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: Date;
  sex: string;
  imageID: number;
}

export interface IProfileModelSaveImageDetailsPayload
  extends ICloudinaryFileMeta {}

export interface IProfileSoftDetails {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: Date;
  sex: string;
  imageID?: number;
  image: IProfileImageSoftDetails;
}

export interface IProfileImageSoftDetails {
  id: number;
  url: string;
  publicID: string;
}
