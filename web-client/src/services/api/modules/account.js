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
  async disable(accountID) {
    const result = await apiService.put(`/account/disable/${accountID}`);
    return !result.data.isActive || {};
  },
  async enable(accountID) {
    const result = await apiService.put(`/account/enable/${accountID}`);
    return result.data.isActive || {};
  },
};

export default accountApiService;
