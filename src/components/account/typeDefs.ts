export interface IAccountModelSaveDetailsInput {
  email: string;
  password: string;
  profileID: number;
  accountTypeID: number;
}

export interface IAccountServiceCreateNewInput {
  firstName: string;
  lastName: string;
  nationality: string;
  email: string;
  birthDate: Date;
  sex: string;
  typeID: number;
  image: Express.Multer.File;
}

export interface IAccountServiceCreateNewResult {
  account?: Account;
  error: {
    email: string;
  };
}
