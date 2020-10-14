import {
  AUTHENTICATION_SIGNUP,
  SET_AUTHENTICATION,
} from "@/store/types/authentication";
import tokenService from "@/services/token";
import authenticationApiService from "@/services/api/modules/authentication";

const authenticationStore = {
  state: {
    isAuthenticated: false,
    token: tokenService.get(),
    credentials: {},
  },

  mutations: {
    [SET_AUTHENTICATION](state, token) {
      tokenService.save(token);
      state.isAuthenticated = true;
      state.credentials = tokenService.decode();
    },
  },

  actions: {
    async [AUTHENTICATION_SIGNUP]({ commit }, input) {
      try {
        const result = await authenticationApiService.signup(input);
        const token = result.data.token ? result.data.token : "";
        tokenService.save(token);
        return { token, error: { email: "" } };
      } catch (error) {
        return { token: "", error: error.response.data };
      }
    },
  },
};

export default authenticationStore;
