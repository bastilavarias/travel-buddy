import accountModel from "./model";
import AccountType from "../../database/entities/AccountType";
import {
  IAccountModelSaveDetailsInput,
  IAccountServiceCreateNewInput,
  IAccountServiceCreateNewResult,
  IAccountSoftDetails,
} from "./typeDefs";
import validator from "validator";
import {
  IProfileModelSaveDetailsInput,
  IProfileModelSaveImageDetailsInput,
} from "../profile/typeDefs";
import profileModel from "../profile/model";
import utilityService from "../utility/service";
import cloudinaryService from "../cloudinary/service";
import { ICloudinaryFileMeta } from "../cloudinary/typeDefs";

const accountService = {
  async createNew(
    input: IAccountServiceCreateNewInput
  ): Promise<IAccountServiceCreateNewResult> {
    const result: IAccountServiceCreateNewResult = {
      error: {
        email: "",
      },
    };
    const isEmail = validator.isEmail(input.email);
    if (!isEmail) {
      result.error.email = `${input.email} is not valid email.`;
      return result;
    }
    const gotAccountDetails = await accountModel.getPartialDetailsByEmail(
      input.email
    );
    const isEmailExists = !!gotAccountDetails;
    if (isEmailExists) {
      result.error.email = `${input.email} is already exists.`;
      return result;
    }
    let uploadedImageMeta: ICloudinaryFileMeta = {
      url: "",
      publicID: "",
      fileName: "",
    };
    if (input.image) {
      const uploadFolder = "accounts";
      uploadedImageMeta = await cloudinaryService.upload(
        input.image,
        uploadFolder
      );
    }
    const imageSaveDetailsInput: IProfileModelSaveImageDetailsInput = {
      url: uploadedImageMeta.url,
      fileName: uploadedImageMeta.fileName,
      publicID: uploadedImageMeta.publicID,
      // @ts-ignore
      data: input.image,
    };
    const savedImageDetails = await profileModel.saveImageDetails(
      imageSaveDetailsInput
    );
    const profileSaveDetailsInput: IProfileModelSaveDetailsInput = {
      firstName: input.firstName,
      lastName: input.lastName,
      nationality: input.nationality,
      birthDate: input.birthDate,
      sex: input.sex,
      imageID: savedImageDetails.id,
    };
    const savedProfileDetails = await profileModel.saveDetails(
      profileSaveDetailsInput
    );
    const defaultPassword = `${input.lastName}-${input.birthDate}`;
    const accountSaveDetailsInput: IAccountModelSaveDetailsInput = {
      email: input.email,
      password: utilityService.hashPassword(defaultPassword),
      accountTypeID: input.typeID,
      profileID: savedProfileDetails.id,
    };
    const savedAccountDetails = await accountModel.saveDetails(
      accountSaveDetailsInput
    );
    const gotAccount = await accountModel.getSoftDetails(
      savedAccountDetails.id
    );
    gotAccount.profile = await profileModel.getSoftDetails(
      gotAccount.profileID!
    );
    delete gotAccount.profileID;
    result.account = gotAccount;
    return result;
  },

  async fetchTypes(): Promise<AccountType[]> {
    return await accountModel.fetchTypes();
  },

  async fetchSoftDetails(): Promise<IAccountSoftDetails[]> {
    const gotRawDetails = await accountModel.fetchRawDetails();
    return await Promise.all(
      gotRawDetails.map(async (rawAccount) => {
        const account: IAccountSoftDetails = await accountModel.getSoftDetails(
          rawAccount.id
        );
        account.profile = await profileModel.getSoftDetails(
          rawAccount.profileID
        );
        return account;
      })
    );
  },
};

export default accountService;
