import Vue from "vue";
import vueAxios from "vue-axios";
import axios from "axios";
import tokenService from "@/services/token";

const apiService = {
  init() {
    Vue.use(vueAxios, axios);
    Vue.axios.defaults.baseURL = "/api";
  },

  setHeader() {
    Vue.axios.defaults.headers.common["Authorization"] = tokenService.get();
  },

  async get(route, body) {
    return await Vue.axios.get(route, body);
  },

  async post(route, body) {
    return await Vue.axios.post(route, body);
  },

  async put(route, body) {
    return await Vue.axios.put(route, body);
  },

  async delete(route, body) {
    return await Vue.axios.delete(route, body);
  },
};

export default apiService;
