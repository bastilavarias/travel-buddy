import apiService from "@/services/api";

const genericApiService = {
  async fetchNationalities() {
    return await apiService.get("/generic/nationalities");
  },

  async fetchSexes() {
    return await apiService.get("/generic/sexes");
  },
};

export default genericApiService;
