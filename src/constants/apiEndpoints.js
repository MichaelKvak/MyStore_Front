export default {
  stores: {
    readList: `${process.env.VUE_APP_API_URL}/store`,
    create: `${process.env.VUE_APP_API_URL}/store/add`,
    update: `${process.env.VUE_APP_API_URL}/store/update`,
    delete: `${process.env.VUE_APP_API_URL}/store`,
    getStoreById: (storeId) =>
      `${process.env.VUE_APP_API_URL}/store/${storeId}`,
    findStoreById: (storeId) =>
      `${process.env.VUE_APP_API_URL}/store/${storeId}`,
  },
  user: {
    signup: `${process.env.VUE_APP_API_URL}/users/signup`,
    login: `${process.env.VUE_APP_API_URL}/users/login`,
  },
};
