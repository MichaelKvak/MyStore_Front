<template>
  <section>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="storeImage" alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="storeImage" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ storeTitle }}</p>
              <p class="subtitle is-6">{{ storeBrand }}</p>
              <p class="subtitle is-6">{{ storePrice }} $</p>
            </div>
          </div>

          <div class="content">
            {{ storeDescription }}
            <br />
            <small>Product quantity - {{ storeQuantity }}</small>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      storeTitle: null,
      storeBrand: null,
      storeImage: null,
      storePrice: null,
      storeQuantity: null,
      storeDescription: null,
      errorMessage: null,
      isCardModalActive: true,
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
  // this.$router.push({ name: "List" });
};
</script>
<style scoped></style>
