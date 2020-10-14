import apiService from "@/services/api";

const authenticationApiService = {
  async signup(input) {
    return await apiService.post("/authentication/signup", input);
  },
};

export default authenticationApiService;
