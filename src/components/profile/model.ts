import Profile from "../../database/entities/Profile";
import {
  IProfileImageSoftDetails,
  IProfileModelSaveDetailsInput,
  IProfileModelSaveImageDetailsInput,
  IProfileSoftDetails,
} from "./typeDefs";
import ProfileImage from "../../database/entities/ProfileImage";
import { getRepository } from "typeorm";

const profileModel = {
  async saveDetails(input: IProfileModelSaveDetailsInput): Promise<Profile> {
    const { firstName, lastName, nationality, birthDate, sex, imageID } = input;
    return await Profile.create({
      firstName,
      lastName,
      nationality,
      birthDate,
      sex,
      image: { id: imageID },
    }).save();
  },

  async saveImageDetails(
    input: IProfileModelSaveImageDetailsInput
  ): Promise<ProfileImage> {
    return await ProfileImage.create(input).save();
  },

  async getSoftDetails(profileID: number): Promise<IProfileSoftDetails> {
    const foundDetails: IProfileSoftDetails = <IProfileSoftDetails>(
      await getRepository(Profile)
        .createQueryBuilder("profile")
        .select([
          "id",
          `"firstName"`,
          `"lastName"`,
          "nationality",
          `"birthDate"`,
          "sex",
          `"imageId" as "imageID"`,
        ])
        .where("profile.id = :id", { id: profileID })
        .getRawOne()
    );
    foundDetails.image = await this.getImageSoftDetails(foundDetails.imageID!);
    delete foundDetails.imageID;
    return foundDetails!;
  },

  async getImageSoftDetails(
    profileImageID: number
  ): Promise<IProfileImageSoftDetails> {
    return await getRepository(ProfileImage)
      .createQueryBuilder("profile_image")
      .select(["id", "url", `"publicID"`])
      .where("profile_image.id = :id", { id: profileImageID })
      .getRawOne();
  },
};

export default profileModel;
