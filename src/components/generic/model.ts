import Nationality from "../../database/entities/Nationality";
import Sex from "../../database/entities/Sex";
import Destination from "../../database/entities/Destination";
import Transportation from "../../database/entities/Transportation";

const genericModel = {
  async fetchNationalities(): Promise<Nationality[]> {
    return await Nationality.find();
  },

  async fetchSexes(): Promise<Sex[]> {
    return await Sex.find();
  },

  async fetchDestinations(): Promise<Destination[]> {
    return await Destination.find();
  },

  async fetchTransportation(): Promise<Transportation[]> {
    return await Transportation.find();
  },
};

export default genericModel;
