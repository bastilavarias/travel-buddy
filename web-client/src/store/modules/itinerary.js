import { CREATE_NEW_ITINERARY } from "@/store/types/itinerary";
import itineraryApiService from "@/services/api/modules/itinerary";
import { SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS } from "@/store/types/generic";

const itineraryStore = {
  actions: {
    async [CREATE_NEW_ITINERARY]({ commit }, form) {
      try {
        const { name, description, pax, images, days } = form;
        const formData = new FormData();
        images.map((image) => formData.append("images", image));
        const uploadedItineraryPost = await itineraryApiService.uploadImages(
          formData
        );
        const payload = {
          name,
          description,
          pax,
          days,
        };
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Creating itinerary done!",
          color: "success",
        });
        return await itineraryApiService.createNew(
          uploadedItineraryPost.id,
          payload
        );
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
