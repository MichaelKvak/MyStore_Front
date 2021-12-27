<template>
  <div class="basket">
    <div class="mini-cart">
      <ul class="mini-cart__product-list">
        <li class="mini-cart__product-item">
          <div class="mini-cart__product-image">
            <img :src="basket_item_data.image" alt="mini cart image" />
          </div>
          <div class="mini-cart__product-info">
            <a href="#" class="mini-cart__product-name">{{
              basket_item_data.title
            }}</a>
            <span>{{ basket_item_data.brand }}</span>
            <div class="mini-cart__product-info-item">
              <span>{{ basket_item_data.description }}</span>

              <span>in store: {{ basket_item_data.quantity }}</span>

              <span>in basket: {{ basket_item_data.qnt }}</span>
            </div>
            <div class="incBtn">
              <span @click="decrement" class="decBtn"
                ><img src="../../img/minus.png" alt="minus"
              /></span>
              <span @click="increment"
                ><img src="../../img/plus.png" alt="plus"
              /></span>
            </div>
            <div class="mini-cart__product-price">
              {{ basket_item_data.price }} $
            </div>
          </div>
        </li>
      </ul>
      <div class="mini-cart__controls">
        <button class="deleteBtn" @click="deleteFromBasket">delete</button>
        <button>
          <a
            href="/"
            class="mini-cart__controls-link mini-cart__controls-link--secondary"
          >
            Checkout
          </a>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "basked-item",
  props: {
    basket_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {};
  },
  computed: {},
  methods: {
    decrement() {
      this.$emit("decrement");
    },
    increment() {
      this.$emit("increment");
    },
    deleteFromBasket() {
      this.$emit("deleteFromBasket");
    },
  },
  mounted() {
    this.$set(this.basket_item_data, "qnt", 1);
  },
};
</script>
<style scoped>
.mini-cart {
  top: 50px;
  right: 10px;
  width: 250px;
  padding: 15px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 50px 0 rgba(0, 0, 0, 0.15);
  font-size: 11px;
  transition: 0.2s;
}

.mini-cart__product-item {
  display: flex;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccd0d3;
}

.mini-cart__product-image img {
  display: block;
  height: 60px;
  width: 60px;
}

.mini-cart__product-name {
  margin-bottom: 15px;
  color: #000;
  text-transform: capitalize;
  font-weight: 500;
}

.mini-cart__product-info {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
}

.mini-cart__product-info-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  color: #888;
}

.mini-cart__product-price {
  font-weight: 600;
}

.mini-cart__controls-price {
  font-weight: 600;
}

.mini-cart__controls-link--secondary {
  color: rgb(0, 0, 0);
  border-radius: 3px;
  background-color: #f0f2f4;
  transition: 0.2s;
}

.deleteBtn {
  margin: 5px;
}
.incBtn {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1px;
}
.decBtn {
  margin: 2px;
}
</style>
