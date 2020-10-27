import {
  CREATE_NEW_ACCOUNT,
  FETCH_ACCOUNT_TYPES,
  SET_ACCOUNT_TYPES,
} from "@/store/types/account";
import accountApiService from "@/services/api/modules/account";

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
    async [FETCH_ACCOUNT_TYPES]({ commit }) {
      try {
        const types = await accountApiService.fetchTypes();
        commit(SET_ACCOUNT_TYPES, types);
      } catch (error) {
        throw new Error(`[RWV] ApiService ${error}`);
      }
    },

    async [CREATE_NEW_ACCOUNT](
      _,
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
        return { account: createdNewAccount, error: {} };
      } catch (error) {
        return { account: {}, error: error.response.data };
      }
    },
  },
};

export default accountStore;
