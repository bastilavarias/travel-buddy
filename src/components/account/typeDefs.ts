import { IProfileSoftDetails } from "../profile/typeDefs";
import AccountType from "../../database/entities/AccountType";

interface IBaseAccountInput {
  firstName: string;
  lastName: string;
  nationality: string;
  email: string;
  password?: string;
  birthDate: Date;
  sex: string;
}

export interface IAccountModelSaveDetailsInput {
  email: string;
  password: string;
  profileID: number;
  accountTypeID: number;
}

export interface IAccountServiceCreateNewInput extends IBaseAccountInput {
  typeID: number;
  image: Express.Multer.File;
}

export interface IAccountServiceCreateNewResult {
  account?: IAccountSoftDetails;
  error: {
    email: string;
  };
}

export interface IAccountSoftDetails extends IBaseAccountInput {
  typeID?: number;
  profileID?: number;
  type: AccountType;
  profile: IProfileSoftDetails;
  isDeleted: boolean;
  isActive: boolean;
}

export interface IAccountRawDetails {
  id: number;
  email: string;
  password: string;
  createdAt: number;
  profileID: number;
  isDeleted: boolean;
  isDisabled: boolean;
  typeID: number;
}
