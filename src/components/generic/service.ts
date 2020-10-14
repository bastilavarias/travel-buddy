import genericModel from "./model";
import Nationality from "../../database/entities/Nationality";

const genericService = {
  async fetchNationalities(): Promise<Nationality[]> {
    return await genericModel.fetchNationalities();
  },
};

export default genericService;
