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

  async fetch() {
    const result = await apiService.get("/itinerary/");
    return result.data || [];
  },

  async delete(postID) {
    const result = await apiService.delete(`/itinerary/delete/${postID}`);
    return result.data.isDeleted || false;
  },
};

export default itineraryApiService;
