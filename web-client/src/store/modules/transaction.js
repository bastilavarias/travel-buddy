import {
  CREATE_TRANSACTION_REVIEW,
  FETCH_CLIENT_BOOKINGS,
  FETCH_TRANSACTION_AVAILABLE_TOUR_GUIDES,
  FETCH_TRANSACTIONS,
  GET_CLIENT_BOOKING,
  GET_TOUR_GUIDE_TRANSACTION_SCHEDULE,
  GET_TRANSACTION_NUMBER,
  TRANSACTION_CHECKOUT,
} from "@/store/types/transaction";
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

    async [FETCH_TRANSACTION_AVAILABLE_TOUR_GUIDES](
      { commit },
      { fromDate, toDate }
    ) {
      try {
        return await transactionApiService.fetchAvailableTourGuides(
          fromDate,
          toDate
        );
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [FETCH_TRANSACTIONS]({ commit }) {
      try {
        return await transactionApiService.fetch();
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [FETCH_CLIENT_BOOKINGS]({ commit }, clientID) {
      try {
        return await transactionApiService.fetchClientBookings(clientID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [GET_CLIENT_BOOKING]({ commit }, transactionID) {
      try {
        return await transactionApiService.getClientBooking(transactionID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [TRANSACTION_CHECKOUT](
      { commit },
      { fromDate, toDate, postID, clientID, tourGuideID, payment }
    ) {
      try {
        const checkoutPayload = {
          fromDate,
          toDate,
          postID,
          clientID,
          tourGuideID,
          token: payment.token,
          amount: payment.amount,
        };
        return await transactionApiService.checkout(checkoutPayload);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [CREATE_TRANSACTION_REVIEW](
      { commit },
      { transactionID, accountID, review }
    ) {
      try {
        const result = await transactionApiService.createReview({
          transactionID,
          accountID,
          review,
        });
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Creating review done!",
          color: "success",
        });
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });

        return {
          success: false,
          data: null,
        };
      }
    },

    async [GET_TOUR_GUIDE_TRANSACTION_SCHEDULE]({ commit }, tourGuideID) {
      try {
        return await transactionApiService.getTourGuideSchedule(tourGuideID);
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
