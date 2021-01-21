import apiService from "@/services/api";

const itineraryApiService = {
  async createNew(postID, form) {
    const result = await apiService.post(
      `/itinerary/create-new/${postID}`,
      form
    );
    return result.data || {};
  },

  async createInquiry(postID, accountID, message) {
    const result = await apiService.post("/itinerary/inquiry", {
      postID,
      accountID,
      message,
    });
    return result.data;
  },

  async uploadImages(formData) {
    const result = await apiService.post("/itinerary/upload-images", formData);
    return result.data || {};
  },

  async fetch() {
    const result = await apiService.get("/itinerary/");
    return result.data || [];
  },

  async getSoftDetails(postID) {
    const result = await apiService.get(`/itinerary/soft-details/${postID}`);
    return result.data || {};
  },

  async delete(postID) {
    const result = await apiService.delete(`/itinerary/delete/${postID}`);
    return result.data.isDeleted || false;
  },

  async disable(postID) {
    const result = await apiService.put(`/itinerary/disable/${postID}`);
    return !result.data.isActive || false;
  },

  async enable(postID) {
    const result = await apiService.put(`/itinerary/enable/${postID}`);
    return result.data.isActive || false;
  },
};

export default itineraryApiService;
