import Profile from "../../database/entities/Profile";
import {
  IProfileModelSaveDetailsInput,
  IProfileModelSaveImageDetailsInput,
} from "./typeDefs";
import ProfileImage from "../../database/entities/ProfileImage";

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
};

export default profileModel;
