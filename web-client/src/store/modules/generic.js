import genericApiService from "@/services/api/modules/generic";
import {
  FETCH_GENERIC_NATIONALITIES,
  FETCH_GENERIC_SEXES,
  GENERIC_SET_NATIONALITIES,
  GENERIC_SET_SEXES,
} from "@/store/types/generic";

const genericStore = {
  state: {
    nationalities: [],
    sexes: [],
  },
  mutations: {
    [GENERIC_SET_NATIONALITIES](state, nationalities) {
      state.nationalities = nationalities;
    },
    [GENERIC_SET_SEXES](state, sexes) {
      state.sexes = sexes;
    },
  },
  actions: {
    async [FETCH_GENERIC_NATIONALITIES]({ commit }) {
      try {
        const result = await genericApiService.fetchNationalities();
        const nationalities = result ? result.data : [];
        commit(GENERIC_SET_NATIONALITIES, nationalities);
      } catch (error) {
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
    async [FETCH_GENERIC_SEXES]({ commit }) {
      try {
        const result = await genericApiService.fetchSexes();
        const sexes = result ? result.data : [];
        commit(GENERIC_SET_SEXES, sexes);
      } catch (error) {
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
  },
};

export default genericStore;
