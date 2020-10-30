import genericApiService from "@/services/api/modules/generic";
import {
  FETCH_GENERIC_NATIONALITIES,
  FETCH_GENERIC_SEXES,
  FETCH_GENERIC_TRANSPORTATION,
  SEARCH_GENERIC_DESTINATIONS,
  SET_GENERIC_DESTINATIONS,
  SET_GENERIC_NATIONALITIES,
  SET_GENERIC_SEXES,
  SET_GENERIC_TRANSPORTATION,
} from "@/store/types/generic";

const genericStore = {
  state: {
    nationalities: [],
    sexes: [],
    destinations: [],
    transportation: [],
  },
  mutations: {
    [SET_GENERIC_NATIONALITIES](state, nationalities) {
      state.nationalities = nationalities;
    },
    [SET_GENERIC_SEXES](state, sexes) {
      state.sexes = sexes;
    },
    [SET_GENERIC_DESTINATIONS](state, destinations) {
      state.destinations = destinations;
    },
    [SET_GENERIC_TRANSPORTATION](state, transportation) {
      state.transportation = transportation;
    },
  },
  actions: {
    async [FETCH_GENERIC_NATIONALITIES]({ commit }) {
      try {
        const nationalities = await genericApiService.fetchNationalities();
        commit(SET_GENERIC_NATIONALITIES, nationalities);
      } catch (error) {
        commit(SET_GENERIC_NATIONALITIES, []);
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
    async [FETCH_GENERIC_SEXES]({ commit }) {
      try {
        const sexes = await genericApiService.fetchSexes();
        commit(SET_GENERIC_SEXES, sexes);
      } catch (error) {
        commit(SET_GENERIC_SEXES, []);
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
    async [SEARCH_GENERIC_DESTINATIONS]({ commit }, query) {
      try {
        const destinations = await genericApiService.searchDestinations(query);
        commit(SET_GENERIC_DESTINATIONS, destinations);
      } catch (error) {
        commit(SET_GENERIC_DESTINATIONS, []);
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
    async [FETCH_GENERIC_TRANSPORTATION]({ commit }) {
      try {
        const transportation = await genericApiService.fetchTransportation();
        commit(SET_GENERIC_TRANSPORTATION, transportation);
      } catch (error) {
        commit(SET_GENERIC_TRANSPORTATION, []);
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
  },
};

export default genericStore;
