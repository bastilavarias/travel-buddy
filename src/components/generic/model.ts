import Nationality from "../../database/entities/Nationality";
import Sex from "../../database/entities/Sex";

const genericModel = {
  async fetchNationalities(): Promise<Nationality[]> {
    return await Nationality.find();
  },

  async fetchSexes(): Promise<Sex[]> {
    return await Sex.find();
  },
};

export default genericModel;
