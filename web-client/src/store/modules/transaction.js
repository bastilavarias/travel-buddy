import { GET_TRANSACTION_NUMBER } from "@/store/types/transaction";
import { SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS } from "@/store/types/generic";
import transactionApiService from "@/services/api/modules/transaction";

const transactionStore = {
  actions: {
    async [GET_TRANSACTION_NUMBER]({ commit }) {
      try {
        return await transactionApiService.getTransactionNumber();
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },
  },
};

export default transactionStore;
