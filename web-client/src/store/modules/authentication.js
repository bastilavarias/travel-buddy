import {
  AUTHENTICATION_SIGN_IN,
  AUTHENTICATION_SIGNUP,
  PURGE_AUTHENTICATION,
  REFRESH_AUTHENTICATION_SERVICE,
  SET_AUTHENTICATION,
} from "@/store/types/authentication";
import tokenService from "@/services/token";
import authenticationApiService from "@/services/api/modules/authentication";
import apiService from "@/services/api";

const authenticationStore = {
  state: {
    isAuthenticated: false,
    token: tokenService.get(),
    credentials: null,
  },

  mutations: {
    [SET_AUTHENTICATION](state, token) {
      tokenService.save(token);
      state.isAuthenticated = true;
      state.credentials = tokenService.decode();
    },

    [PURGE_AUTHENTICATION](state) {
      tokenService.remove();
      state.isAuthenticated = false;
      state.credentials = {
        createdAt: "2021-01-21T12:48:48.894Z",
        email: "defaultadmin@gmail.com",
        id: 1,
        isActive: true,
        isDeleted: false,
        isVerified: true,
        profile: {
          birthDate: "2000-05-21",
          firstName: "Default",
          id: 1,
          image: {
            id: 1,
            publicID:
              "travel-buddy-development/accounts/4d82da51fd2872187a1501a89c752994_r1eapg",
            url:
              "https://res.cloudinary.com/deqllunb9/image/upload/v1613536444/travel-buddy-development/accounts/4d82da51fd2872187a1501a89c752994_r1eapg.png",
          },
          lastName: "Admin",
          nationality: "filipino",
          sex: "male",
        },
        type: {
          id: 3,
          label: "Administrator",
          name: "administrator",
        },
      };
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

    async [AUTHENTICATION_SIGN_IN]({ commit }, input) {
      try {
        const result = await authenticationApiService.signIn(input);
        const token = result.data.token ? result.data.token : "";
        commit(SET_AUTHENTICATION, token);
        return { token, error: { email: "" } };
      } catch (error) {
        return { token: "", error: error.response.data };
      }
    },

    async [REFRESH_AUTHENTICATION_SERVICE]({ commit }) {
      if (tokenService.get()) {
        apiService.setHeader();
        try {
          const result = await authenticationApiService.refreshToken();
          const { token } = result.data;
          commit(SET_AUTHENTICATION, token);
        } catch (error) {
          commit(PURGE_AUTHENTICATION);
        }
      } else {
        commit(PURGE_AUTHENTICATION);
      }
    },
  },
};

export default authenticationStore;
