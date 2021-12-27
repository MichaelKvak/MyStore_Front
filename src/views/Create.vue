<template>
  <div class="create">
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div class="CreateList">
      <label class="field">
        Product title
        <input type="text" v-model="storeTitle" />
      </label>
      <br />
      <label class="field">
        Product brand
        <input type="text" v-model="storeBrand" />
      </label>
      <br />
      <label class="field">
        Product image URL
        <input type="text" v-model="storeImage" />
      </label>
      <br />
      <label class="field">
        Product price
        <input type="number" v-model.number="storePrice" />
      </label>
      <br />
      <label class="field">
        Product quantity
        <input type="number" v-model.number="storeQuantity" />
      </label>
      <br />
      <label class="field">
        Product description
        <input type="text" v-model="storeDescription" />
      </label>
      <div>
        <b-button
          type="is-success is-light"
          @click="onSave"
          rounded
          :disabled="!isDataValid"
          >{{ saveBtn }}</b-button
        >
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      storeTitle: null,
      storeBrand: null,
      storeImage: null,
      storePrice: null,
      storeQuantity: null,
      storeDescription: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters("stores", ["isLoading", "hasError"]),
    isDataValid() {
      return (
        this.storeTitle &&
        this.storeBrand &&
        this.storeImage &&
        this.storePrice &&
        this.storeQuantity &&
        this.storeDescription
      );
    },
    isEditing() {
      return !!this.$route.params.id;
    },
    saveBtn() {
      return this.isEditing ? "save" : "create";
    },
  },
  methods: {
    ...mapActions("stores", ["createStore", "getStoreById", "updateStore"]),
    async onSave() {
      this.errorMessage = "";
      try {
        if (this.isEditing) {
          await this.updateStore({
            storeTitle: this.storeTitle,
            storeBrand: this.storeBrand,
            storeImage: this.storeImage,
            storePrice: this.storePrice,
            storeQuantity: this.storeQuantity,
            storeDescription: this.storeDescription,
          });
        } else {
          await this.createStore({
            storeTitle: this.storeTitle,
            storeBrand: this.storeBrand,
            storeImage: this.storeImage,
            storePrice: this.storePrice,
            storeQuantity: this.storeQuantity,
            storeDescription: this.storeDescription,
          });
        }
        this.$router.push({ name: "List" });
      } catch {
        this.errorMessage = "Saving error";
      }
    },
  },
  async mounted() {
    if (this.isEditing) {
      try {
        const editedObj = await this.getStoreById(this.$route.params.id);
        this.storeTitle = editedObj.title;
        this.storeBrand = editedObj.brand;
        this.storeImage = editedObj.image;
        this.storePrice = editedObj.price;
        this.storeQuantity = editedObj.quantity;
        this.storeDescription = editedObj.description;
      } catch {
        this.errorMessage = "edited error";
      }
    }
  },
};
</script>
<style scoped>
.create {
  color: rgb(7, 7, 7) !important;
}
.CreateList {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
