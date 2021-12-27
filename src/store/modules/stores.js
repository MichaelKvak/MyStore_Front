import axios from "axios";
import apiEndpoints from "../../constants/apiEndpoints";

export default {
  namespaced: true,
  state: {
    storeList: [],
    editedObj: null,
    loading: false,
    error: null,
    basket: [],
  },
  getters: {
    getStoreList: (state) => state.storeList,
    getEditedObj: (state) => state.editedObj,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    takeBasket: (state) => state.basket,
  },
  mutations: {
    deleteStore(state, storeId) {
      state.storeList = state.storeList.filter((item) => item._id !== storeId);
    },
    setEditedObj(state, obj) {
      state.editedObj = obj;
    },
    setStoreList(state, list) {
      state.storeList = list;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    SET_Basket: (state, product) => {
      if (state.basket.length) {
        let exist = false;
        state.basket.map(function (elm) {
          if (elm._id === product._id) {
            exist = true;
            elm.qnt++;
          }
        });
        if (!exist) {
          state.basket.push(product);
        }
      } else {
        state.basket.push(product);
      }
    },
    Remove_From_Basket: (state, index) => {
      state.basket.splice(index, 1);
    },
  },
  actions: {
    loadStore({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      axios
        .get(apiEndpoints.stores.readList)
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("setStoreList", resData.data);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    createStore(
      { commit },
      {
        storeTitle,
        storeBrand,
        storeImage,
        storePrice,
        storeQuantity,
        storeDescription,
      }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.stores.create, {
            storeTitle,
            storeBrand,
            storeImage,
            storePrice,
            storeQuantity,
            storeDescription,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    getStoreById({ commit }, storeId) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.stores.getStoreById(storeId))
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) {
              commit("setEditedObj", resData.data);
              resolve(resData.data);
            } else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
    deleteStoreCart({ commit }, storeId) {
      commit("setLoading", true);
      commit("setError", null);

      axios
        .delete(apiEndpoints.stores.delete, {
          storeId,
        })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("deleteStore", storeId);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    findStoreById({ commit }, storeId) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.stores.findStoreById(storeId))
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(resData.data);
          })
          .catch((err) => {
            commit("hasError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    updateStore(
      { commit, state },
      {
        storeTitle,
        storeBrand,
        storeImage,
        storePrice,
        storeQuantity,
        storeDescription,
      }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .put(apiEndpoints.stores.update, {
            storeId: state.editedObj._id,
            storeTitle,
            storeBrand,
            storeImage,
            storePrice,
            storeQuantity,
            storeDescription,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
    AddToBasket({ commit }, product) {
      commit("SET_Basket", product);
    },
    DeleteFromBasket({ commit }, index) {
      commit("Remove_From_Basket", index);
    },
  },
};
