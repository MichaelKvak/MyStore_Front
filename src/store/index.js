import Vue from "vue";
import Vuex from "vuex";

import stores from "../store/modules/stores";
import auth from "../store/modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    stores,
    auth,
  },
});

export default store;
