import apiService from "@/services/api";

const itineraryApiService = {
  async createNew(postID, form) {
    const result = await apiService.post(
      `/itinerary/create-new/${postID}`,
      form
    );
    return result.data || {};
  },

  async uploadImages(formData) {
    const result = await apiService.post("/itinerary/upload-images", formData);
    return result.data || {};
  },
};

export default itineraryApiService;
