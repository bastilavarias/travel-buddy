import apiService from "@/services/api";

const genericApiService = {
  async fetchNationalities() {
    const result = await apiService.get("/generic/nationalities");
    return result.data || [];
  },

  async fetchSexes() {
    const result = await apiService.get("/generic/sexes");
    return result.data || [];
  },

  async searchDestinations(query) {
    const url = `https://nominatim.openstreetmap.org/search/${query}?format=json&addressdetails=1&limit=5`;
    const result = await apiService.get(url);
    return result.data || [];
  },
};

export default genericApiService;
