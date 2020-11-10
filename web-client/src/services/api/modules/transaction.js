import apiService from "@/services/api";

const transactionApiService = {
  async getTransactionNumber() {
    const result = await apiService.get("/transaction/transaction-number");
    return result.data.transactionNumber || "";
  },
};

export default transactionApiService;
