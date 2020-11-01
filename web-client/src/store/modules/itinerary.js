import {
  CREATE_NEW_ITINERARY,
  FETCH_ITINERARIES,
  SET_ITINERARIES,
} from "@/store/types/itinerary";
import itineraryApiService from "@/services/api/modules/itinerary";
import { SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS } from "@/store/types/generic";

const itineraryStore = {
  state: {
    list: [],
  },

  mutations: {
    [SET_ITINERARIES](state, itineraries) {
      state.list = itineraries;
    },
  },

  actions: {
    async [CREATE_NEW_ITINERARY]({ commit }, form) {
      try {
        const { name, description, price, pax, images, days } = form;
        const formData = new FormData();
        images.map((image) => formData.append("images", image));
        const uploadedItineraryPost = await itineraryApiService.uploadImages(
          formData
        );
        const payload = {
          name,
          description,
          price,
          pax,
          days,
        };
        const createdItinerary = await itineraryApiService.createNew(
          uploadedItineraryPost.id,
          payload
        );
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Creating itinerary done!",
          color: "success",
        });
        return createdItinerary;
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [FETCH_ITINERARIES]({ commit }) {
      try {
        const itineraries = await itineraryApiService.fetch();
        commit(SET_ITINERARIES, itineraries);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
  },
};

export default itineraryStore;
