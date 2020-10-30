import Vue from "vue";
import Vuex from "vuex";
import genericStore from "@/store/modules/generic";
import authenticationStore from "@/store/modules/authentication";
import accountStore from "@/store/modules/account";
import itineraryStore from "@/store/modules/itinerary";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    generic: genericStore,
    authentication: authenticationStore,
    account: accountStore,
    itinerary: itineraryStore,
  },
});
