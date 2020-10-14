import Profile from "../../database/entities/Profile";
import { ProfileModelSaveDetailsInput } from "./typeDefs";

const profileModel = {
  async saveDetails(input: ProfileModelSaveDetailsInput): Promise<Profile> {
    const { firstName, lastName, nationality, birthDate, sex } = input;
    return await Profile.create({
      firstName,
      lastName,
      nationality,
      birthDate,
      sex,
    }).save();
  },
};

export default profileModel;
