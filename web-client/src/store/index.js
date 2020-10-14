import Vue from "vue";
import Vuex from "vuex";
import genericStore from "@/store/modules/generic";
import authenticationStore from "@/store/modules/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    generic: genericStore,
    authentication: authenticationStore,
  },
});
