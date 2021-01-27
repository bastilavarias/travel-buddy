import {
  CREATE_ITINERARY_INQUIRY,
  CREATE_ITINERARY_INQUIRY_REPLY,
  CREATE_NEW_ITINERARY,
  DELETE_ITINERARY,
  DISABLE_ITINERARY,
  ENABLE_ITINERARY,
  FETCH_ITINERARIES,
  GET_ITINERARY_INQUIRIES,
  GET_ITINERARY_SOFT_DETAILS,
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

    async [CREATE_ITINERARY_INQUIRY](
      { commit },
      { postID, accountID, message }
    ) {
      try {
        const data = await itineraryApiService.createInquiry(
          postID,
          accountID,
          message
        );
        return {
          success: true,
          data,
        };
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return {
          success: false,
          data: null,
        };
      }
    },

    async [CREATE_ITINERARY_INQUIRY_REPLY](
      { commit },
      { inquiryID, accountID, message }
    ) {
      try {
        const data = await itineraryApiService.createInquiryReply(
          inquiryID,
          accountID,
          message
        );
        return {
          success: true,
          data,
        };
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return {
          success: false,
          data: null,
        };
      }
    },

    async [GET_ITINERARY_INQUIRIES]({ commit }, { postID, skip }) {
      try {
        return await itineraryApiService.getInquiries(postID, skip);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return [];
      }
    },

    async [FETCH_ITINERARIES]({ commit }) {
      try {
        const itineraries = await itineraryApiService.fetch();
        commit(SET_ITINERARIES, itineraries);
        return itineraries;
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [GET_ITINERARY_SOFT_DETAILS]({ commit }, postID) {
      try {
        return await itineraryApiService.getSoftDetails(postID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [DELETE_ITINERARY]({ commit }, postID) {
      try {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Deleting itinerary done!",
          color: "error",
        });
        return await itineraryApiService.delete(postID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return false;
      }
    },

    async [DISABLE_ITINERARY]({ commit }, postID) {
      try {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Disabling itinerary done!",
          color: "error",
        });
        return await itineraryApiService.disable(postID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return false;
      }
    },

    async [ENABLE_ITINERARY]({ commit }, postID) {
      try {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Enabling itinerary done!",
          color: "success",
        });
        return await itineraryApiService.enable(postID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return false;
      }
    },
  },
};

export default itineraryStore;
