import apiService from "@/services/api";

const transactionApiService = {
  async getTransactionNumber() {
    const result = await apiService.get("/transaction/transaction-number");
    return result.data.transactionNumber || "";
  },

  async fetchAvailableTourGuides(fromDate, toDate) {
    const result = await apiService.get(
      `/transaction/available-tour-guides/${fromDate}/${toDate}`
    );
    return result.data || [];
  },
};

export default transactionApiService;
