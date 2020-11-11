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

  async checkout({
    postID,
    clientID,
    tourGuideID,
    token,
    fromDate,
    toDate,
    amount,
  }) {
    const result = await apiService.post(
      `/transaction/checkout/${postID}/${clientID}/${tourGuideID}/${token}`,
      { fromDate, toDate, amount }
    );
    return result.data || {};
  },

  async fetch() {
    const result = await apiService.get("/transaction");
    return result.data || [];
  },
};

export default transactionApiService;
