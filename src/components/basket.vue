<template>
  <div class="basket">
    <router-link :to="{ name: 'List' }">
      <div class="inList">
        <img src="../../img/shop-store.png" alt="back to store" />
      </div>
    </router-link>

    <span class="warningText">
      <p v-if="!basket_data.length">There are no products in basket...</p>
    </span>
    <basket-item
      v-for="(item, index) in basket_data"
      :key="item._id"
      :basket_item_data="item"
      @deleteFromBasket="deleteFromBasket(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div class="total">
      <p class="total_name">Total:</p>
      <p>{{ basketTotal }} $</p>
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
  computed: {
    basketTotal() {
      let result = [];
      if (this.basket_data.length) {
        for (let item of this.basket_data) {
          result.push(item.price * item.qnt);
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions("stores", [
      "DeleteFromBasket",
      "Increment_Basket_Item",
      "Decrement_Basket_Item",
    ]),
    deleteFromBasket(index) {
      this.DeleteFromBasket(index);
    },
    increment(index) {
      this.Increment_Basket_Item(index);
    },
    decrement(index) {
      this.Decrement_Basket_Item(index);
    },
  },
  mounted() {},
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
.total {
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 15px;
  background: rgb(78, 156, 0);
  color: #ffffff;
  font-size: 20px;
}
.total_name {
  margin-right: 15px;
}
</style>
