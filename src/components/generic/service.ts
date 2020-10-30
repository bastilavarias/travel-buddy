import genericModel from "./model";
import Nationality from "../../database/entities/Nationality";
import Sex from "../../database/entities/Sex";
import Destination from "../../database/entities/Destination";
import Transportation from "../../database/entities/Transportation";

const genericService = {
  async fetchNationalities(): Promise<Nationality[]> {
    return await genericModel.fetchNationalities();
  },

  async fetchSexes(): Promise<Sex[]> {
    return await genericModel.fetchSexes();
  },

  async fetchDestinations(): Promise<Destination[]> {
    return await genericModel.fetchDestinations();
  },

  async fetchTransportation(): Promise<Transportation[]> {
    return await genericModel.fetchTransportation();
  },
};

export default genericService;
