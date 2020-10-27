import apiService from "@/services/api";

const accountApiService = {
  async fetchTypes() {
    const result = await apiService.get("/account/types");
    return result.data || [];
  },

  async createNew(formData) {
    const result = await apiService.post("/account/create-new", formData);
    return result.data || {};
  },
};

export default accountApiService;
