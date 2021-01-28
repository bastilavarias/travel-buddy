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

  async fetchClientBookings(clientID) {
    const result = await apiService.get(
      `/transaction/client-bookings/${clientID}`
    );
    return result.data || [];
  },

  async getClientBooking(transactionID) {
    const result = await apiService.get(
      `/transaction/client-booking/${transactionID}`
    );
    return result.data || {};
  },

  async createReview({ transactionID, accountID, review }) {
    const result = await apiService.post("/transaction/review", {
      transactionID,
      accountID,
      review,
    });
    return result.data || null;
  },
};

export default transactionApiService;
