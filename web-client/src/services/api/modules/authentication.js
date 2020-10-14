import apiService from "@/services/api";

const authenticationApiService = {
  async signup(input) {
    return await apiService.post("/authentication/signup", input);
  },

  async signIn(input) {
    return await apiService.post("/authentication/sign-in", input);
  },
};

export default authenticationApiService;
