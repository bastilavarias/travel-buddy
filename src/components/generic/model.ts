import Nationality from "../../database/entities/Nationality";

const genericModel = {
  async fetchNationalities(): Promise<Nationality[]> {
    return await Nationality.find();
  },
};

export default genericModel;
