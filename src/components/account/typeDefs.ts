import { IProfileSoftDetails } from "../profile/typeDefs";
import AccountType from "../../database/entities/AccountType";

interface IBaseAccount {
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

export interface IAccountServiceCreateNewInput extends IBaseAccount {
  typeID: number;
  image: Express.Multer.File;
}

export interface IAccountServiceCreateNewResult {
  account?: IAccountSoftDetails;
  error: {
    email: string;
  };
}

export interface IAccountSoftDetails extends IBaseAccount {
  typeID?: number;
  profileID?: number;
  type: AccountType;
  profile: IProfileSoftDetails;
}
