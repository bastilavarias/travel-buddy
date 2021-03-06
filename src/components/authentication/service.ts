import {
  IAuthenticationServiceRefreshTokenResult,
  IAuthenticationServiceSignInInput,
  IAuthenticationServiceSignInResult,
  IAuthenticationServiceSignupInput,
  IAuthenticationServiceSignupResult,
} from "./typeDefs";
import validator from "validator";
import profileModel from "../profile/model";
import utilityService from "../utility/service";
import accountModel from "../account/model";
import jsonwebtoken from "jsonwebtoken";
import { IAccountModelSaveDetailsPayload } from "../account/typeDefs";
import {
  IProfileModelSaveDetailsPayload,
  IProfileModelSaveImageDetailsPayload,
} from "../profile/typeDefs";

const authenticationService = {
  async signup(
    input: IAuthenticationServiceSignupInput
  ): Promise<IAuthenticationServiceSignupResult> {
    const result = {
      token: "",
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
    const imageSaveDetailsPayload: IProfileModelSaveImageDetailsPayload = {
      url:
        "https://res.cloudinary.com/deqllunb9/image/upload/v1604893920/travel-buddy-development/accounts/placeholder/profile-image_vaskgt.png",
      publicID: "",
      // @ts-ignore
      data: null,
    };
    const savedImageDetails = await profileModel.saveImageDetails(
      imageSaveDetailsPayload
    );
    const profileSaveDetailsPayload: IProfileModelSaveDetailsPayload = {
      firstName: input.firstName,
      lastName: input.lastName,
      nationality: input.nationality,
      birthDate: input.birthDate,
      sex: input.sex,
      imageID: savedImageDetails.id,
    };
    const savedProfileDetails = await profileModel.saveDetails(
      profileSaveDetailsPayload
    );
    const clientTypeID = 1;
    const accountSaveDetailsPayload: IAccountModelSaveDetailsPayload = {
      email: input.email,
      password: utilityService.hashPassword(input.password),
      accountTypeID: clientTypeID,
      profileID: savedProfileDetails.id,
      isVerified: false,
    };
    const savedAccountDetails = await accountModel.saveDetails(
      accountSaveDetailsPayload
    );
    // @ts-ignore
    delete savedAccountDetails.password;
    const generatedJsonWebToken = jsonwebtoken.sign(
      JSON.stringify(savedAccountDetails),
      <jsonwebtoken.Secret>process.env.JWT_SECRET_OR_KEY
    );
    result.token = `Bearer ${generatedJsonWebToken}`;
    return result;
  },

  async signIn(
    input: IAuthenticationServiceSignInInput
  ): Promise<IAuthenticationServiceSignInResult> {
    const result = {
      token: "",
      error: {
        email: "",
        password: "",
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
    if (!isEmailExists) {
      result.error.email = `${input.email} is not exists.`;
      return result;
    }
    const isAccountDisabled = !gotAccountDetails.isActive;
    if (isAccountDisabled) {
      result.error.email = `Account was disabled. Please contact the administrator to enable your account.`;
      return result;
    }
    const isPlainTextPasswordValid = utilityService.validateHashPassword(
      input.password,
      gotAccountDetails.password
    );
    if (!isPlainTextPasswordValid) {
      result.error.password = `Password is not valid.`;
      return result;
    }
    // @ts-ignore
    delete gotAccountDetails.password;
    const generatedJsonWebToken = jsonwebtoken.sign(
      JSON.stringify(gotAccountDetails),
      <jsonwebtoken.Secret>process.env.JWT_SECRET_OR_KEY
    );
    result.token = `Bearer ${generatedJsonWebToken}`;
    return result;
  },

  async refreshToken(
    accountID: number
  ): Promise<IAuthenticationServiceRefreshTokenResult> {
    const result = {
      token: "",
    };
    const gotAccountDetails = await accountModel.getDetailsByID(accountID);
    // @ts-ignore
    delete gotAccountDetails.password;
    const generatedJsonWebToken = jsonwebtoken.sign(
      JSON.stringify(gotAccountDetails),
      <jsonwebtoken.Secret>process.env.JWT_SECRET_OR_KEY
    );
    result.token = `Bearer ${generatedJsonWebToken}`;
    return result;
  },
};

export default authenticationService;
