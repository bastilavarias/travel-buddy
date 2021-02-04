import {
  CREATE_NEW_ACCOUNT,
  DELETE_ACCOUNT,
  DISABLE_ACCOUNT,
  ENABLE_ACCOUNT,
  FETCH_ACCOUNT_TYPES,
  FETCH_ACCOUNTS_DETAILS,
  FETCH_TOUR_GUIDE_ACCOUNTS,
  GET_ACCOUNT,
  SET_ACCOUNT_TYPES,
  UPDATE_ACCOUNT,
  VERIFY_ACCOUNT,
} from "@/store/types/account";
import accountApiService from "@/services/api/modules/account";
import { SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS } from "@/store/types/generic";

const accountStore = {
  state: {
    types: [],
  },

  mutations: {
    [SET_ACCOUNT_TYPES](state, types) {
      state.types = types;
    },
  },

  actions: {
    async [CREATE_NEW_ACCOUNT](
      { commit },
      {
        firstName,
        lastName,
        nationality,
        birthDate,
        sex,
        email,
        typeID,
        images,
      }
    ) {
      try {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("nationality", nationality);
        formData.append("birthDate", birthDate);
        formData.append("sex", sex);
        formData.append("email", email);
        formData.append("typeID", typeID);
        formData.append("image", images[0]);
        const createdNewAccount = await accountApiService.createNew(formData);
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Creating account done!",
          color: "success",
        });
        return { account: createdNewAccount, error: {} };
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return { account: {}, error: error.response.data };
      }
    },

    async [UPDATE_ACCOUNT](
      { commit },
      {
        accountID,
        firstName,
        lastName,
        nationality,
        birthDate,
        sex,
        email,
        typeID,
        images,
      }
    ) {
      try {
        const formData = new FormData();
        formData.append("accountID", accountID);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("nationality", nationality);
        formData.append("birthDate", birthDate);
        formData.append("sex", sex);
        formData.append("email", email);
        formData.append("typeID", typeID);
        formData.append("image", images[0]);
        const createdNewAccount = await accountApiService.update(formData);
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Updating account done!",
          color: "success",
        });
        return { account: createdNewAccount, error: {} };
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return { account: {}, error: error.response.data };
      }
    },

    async [FETCH_ACCOUNT_TYPES]({ commit }) {
      try {
        const types = await accountApiService.fetchTypes();
        commit(SET_ACCOUNT_TYPES, types);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [FETCH_ACCOUNTS_DETAILS]({ commit }) {
      try {
        return await accountApiService.fetchDetails();
      } catch (_) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return [];
      }
    },

    async [GET_ACCOUNT]({ commit }, id) {
      try {
        const result = await accountApiService.getInformation(id);
        if (!result)
          throw new Error(
            "Something went wrong to the server. Please try again."
          );
        return result;
      } catch (_) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return [];
      }
    },

    async [FETCH_TOUR_GUIDE_ACCOUNTS]({ commit }, query) {
      try {
        return await accountApiService.fetchTourGuides(query);
      } catch (_) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return [];
      }
    },

    async [DISABLE_ACCOUNT]({ commit }, accountID) {
      try {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Disabling account done!",
          color: "error",
        });
        return await accountApiService.disable(accountID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return false;
      }
    },

    async [ENABLE_ACCOUNT]({ commit }, accountID) {
      try {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Enabling account done!",
          color: "success",
        });
        return await accountApiService.enable(accountID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return false;
      }
    },

    async [DELETE_ACCOUNT]({ commit }, accountID) {
      try {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Deleting account done!",
          color: "error",
        });
        return await accountApiService.delete(accountID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return false;
      }
    },

    async [VERIFY_ACCOUNT]({ commit }, accountID) {
      try {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Verifying account done!",
          color: "success",
        });
        return await accountApiService.verify(accountID);
      } catch (error) {
        commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: true,
          text: "Something went wrong to the server. Please try again.",
          color: "error",
        });
        return false;
      }
    },
  },
};

export default accountStore;
