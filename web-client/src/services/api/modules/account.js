import apiService from "@/services/api";

const accountApiService = {
  async createNew(formData) {
    const result = await apiService.post("/account/create-new", formData);
    return result.data || {};
  },
  async fetchTypes() {
    const result = await apiService.get("/account/types");
    return result.data || [];
  },
  async fetchDetails() {
    const result = await apiService.get("/account/details");
    return result.data || [];
  },
};

export default accountApiService;