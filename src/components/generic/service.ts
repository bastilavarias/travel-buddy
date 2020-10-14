import genericModel from "./model";
import Nationality from "../../database/entities/Nationality";
import Sex from "../../database/entities/Sex";

const genericService = {
  async fetchNationalities(): Promise<Nationality[]> {
    return await genericModel.fetchNationalities();
  },

  async fetchSexes(): Promise<Sex[]> {
    return await genericModel.fetchSexes();
  },
};

export default genericService;
