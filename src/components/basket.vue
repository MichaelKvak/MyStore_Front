<template>
  <div>
    <h1><strong>Basket</strong></h1>
    <div class="basket">
      <P v-if="!basket_data.length" class="warningText"
        >There are no items in basket...</P
      >
      <router-link :to="{ name: 'List' }">
        <div class="inList">
          <img src="../../img/shop-store.png" alt="back to store" />
        </div>
      </router-link>

      <basket-item
        v-for="(item, index) in basket_data"
        :key="item._id"
        :basket_item_data="item"
        @deleteFromBasket="deleteFromBasket(index)"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import basketItem from "./basket-item.vue";

export default {
  name: "basket",
  components: {
    basketItem,
  },
  props: {
    basket_data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions("stores", ["DeleteFromBasket"]),
    deleteFromBasket(index) {
      this.DeleteFromBasket(index);
    },
  },
};
</script>
<style scoped>
.basket {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 15px;

  margin-left: auto;
  margin-right: auto;
}
.inList {
  position: absolute;
  top: 8px;
  right: 10px;
  padding: 5px 10px;
  border: solid 1px;
}
.warningText {
  color: rgb(236, 134, 134);
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
