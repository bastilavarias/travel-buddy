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
  async fetchTourGuides() {
    const result = await apiService.get("/account/tour-guides");
    return result.data || [];
  },
  async disable(accountID) {
    const result = await apiService.put(`/account/disable/${accountID}`);
    return !result.data.isActive || false;
  },
  async enable(accountID) {
    const result = await apiService.put(`/account/enable/${accountID}`);
    return result.data.isActive || false;
  },
  async delete(accountID) {
    const result = await apiService.delete(`/account/delete/${accountID}`);
    return result.data.isDeleted || false;
  },
  async verify(accountID) {
    const result = await apiService.put(`/account/verify/${accountID}`);
    return result.data.isVerified || false;
  },
};

export default accountApiService;
