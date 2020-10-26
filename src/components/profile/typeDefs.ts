import { ICloudinaryFileMeta } from "../cloudinary/typeDefs";

export interface IProfileModelSaveDetailsInput {
  firstName: string;
  lastName: string;
  nationality: string;
  birthDate: Date;
  sex: string;
  imageID: number;
}

export interface IProfileModelSaveImageDetailsInput
  extends ICloudinaryFileMeta {
  data: Buffer;
}

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
