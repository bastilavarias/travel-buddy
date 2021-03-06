import accountModel from "./model";
import AccountType from "../../database/entities/AccountType";
import {
  IAccountModelSaveDetailsPayload,
  IAccountServiceCreateNewInput,
  IAccountServiceCreateNewResult,
  IAccountSoftDetails,
} from "./typeDefs";
import validator from "validator";
import {
  IProfileModelSaveDetailsPayload,
  IProfileModelSaveImageDetailsPayload,
} from "../profile/typeDefs";
import profileModel from "../profile/model";
import utilityService from "../utility/service";
import cloudinaryService from "../cloudinary/service";
import { ICloudinaryFileMeta } from "../cloudinary/typeDefs";
import Account from "../../database/entities/Account";

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
    const imageSaveDetailsInput: IProfileModelSaveImageDetailsPayload = {
      url: uploadedImageMeta.url,
      fileName: uploadedImageMeta.fileName,
      publicID: uploadedImageMeta.publicID,
      // @ts-ignore
      data: input.image,
    };
    const savedImageDetails = await profileModel.saveImageDetails(
      imageSaveDetailsInput
    );
    const profileSaveDetailsInput: IProfileModelSaveDetailsPayload = {
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
    const defaultPassword = `${input.firstName.toUpperCase()}_${input.lastName.toUpperCase()}`;
    const accountSaveDetailsInput: IAccountModelSaveDetailsPayload = {
      email: input.email,
      password: utilityService.hashPassword(defaultPassword),
      accountTypeID: input.typeID,
      profileID: savedProfileDetails.id,
      isVerified: true,
    };
    const savedAccountDetails = await accountModel.saveDetails(
      accountSaveDetailsInput
    );
    const gotAccount = await accountModel.getGenericDetails(
      savedAccountDetails.id
    );
    gotAccount.profile = await profileModel.getSoftDetails(
      gotAccount.profileID!
    );
    delete gotAccount.profileID;
    result.account = gotAccount;
    return result;
  },

  async update(
    accountID: number,
    input: IAccountServiceCreateNewInput
  ): Promise<IAccountServiceCreateNewResult> {
    const result: IAccountServiceCreateNewResult = {
      error: {
        email: "",
      },
    };
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
    const gotFullAccountInformation = await accountModel.getDetailsByID(
      accountID
    );
    if (input.image) {
      const imageSaveDetailsInput: IProfileModelSaveImageDetailsPayload = {
        url: uploadedImageMeta.url,
        fileName: uploadedImageMeta.fileName,
        publicID: uploadedImageMeta.publicID,
        // @ts-ignore
        data: input.image,
      };
      await profileModel.updateImageDetails(
        gotFullAccountInformation.profile.image.id,
        imageSaveDetailsInput
      );
    }
    const profileUpdateDetailsPayload: IProfileModelSaveDetailsPayload = {
      firstName: input.firstName,
      lastName: input.lastName,
      nationality: input.nationality,
      birthDate: input.birthDate,
      sex: input.sex,
      imageID: gotFullAccountInformation.profile.image.id,
    };
    await profileModel.updateDetails(
      gotFullAccountInformation.profile.id,
      profileUpdateDetailsPayload
    );
    const accountUpdateDetailsInput: IAccountModelSaveDetailsPayload = {
      email: input.email,
      password: "",
      accountTypeID: input.typeID,
      profileID: gotFullAccountInformation.profile.id,
      isVerified: true,
    };
    const updateAccountDetails = await accountModel.updateDetails(
      accountID,
      accountUpdateDetailsInput
    );
    const gotAccount = await accountModel.getGenericDetails(
      updateAccountDetails.id
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

  async fetchDetails(): Promise<IAccountSoftDetails[]> {
    const gotRawDetails = await accountModel.fetchRawDetails();
    return await Promise.all(
      gotRawDetails.map(async (rawAccount) => {
        const account: IAccountSoftDetails = await accountModel.getGenericDetails(
          rawAccount.id
        );
        account.profile = await profileModel.getSoftDetails(
          rawAccount.profileID
        );
        return account;
      })
    );
  },

  async updatePassword(accountID: number, password: string) {
    const hashedPassword = utilityService.hashPassword(password);
    return await accountModel.updatePassword(accountID, hashedPassword);
  },

  async fetchTourGuides(): Promise<Account[]> {
    return await accountModel.fetchTourGuides();
  },

  async searchTourGuides(query: string): Promise<Account[]> {
    return await accountModel.searchTourGuides(query);
  },

  async getInformation(id: number): Promise<Account> {
    return await accountModel.getDetailsByID(id);
  },

  async getTourGuideRecord(id: number): Promise<Account> {
    return await accountModel.getTourGuideRecord(id);
  },

  async disable(accountID: number): Promise<IAccountSoftDetails> {
    const disabledStatus = false;
    return await accountModel.updateActiveStatus(accountID, disabledStatus);
  },

  async enable(accountID: number): Promise<IAccountSoftDetails> {
    const enabledStatus = true;
    return await accountModel.updateActiveStatus(accountID, enabledStatus);
  },

  async delete(accountID: number): Promise<IAccountSoftDetails> {
    const deletedStatus = true;
    return await accountModel.updateDeleteStatus(accountID, deletedStatus);
  },

  async verify(accountID: number): Promise<IAccountSoftDetails> {
    return await accountModel.updateVerifiedStatus(accountID);
  },
};

export default accountService;
