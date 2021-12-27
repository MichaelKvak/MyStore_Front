<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div v-if="!isLoading && !hasError">
      <router-link
        :to="{ name: 'basket', params: { basket_data: takeBasket } }"
      >
        <div class="inBasket">
          <img src="../../img/basket_small.png" alt="basket" />{{
            takeBasket.length
          }}
        </div>
      </router-link>

      <div class="filters">
        <span>filter by brands</span>
        <v-select
          :selected="selected"
          :options="brands"
          @select="sortByBrands"
        />
        <div class="range-slider">
          <input
            type="range"
            min="0"
            max="3000"
            step="1"
            v-model.number="minPrice"
            @change="setChangeSliders"
          />
          <input
            type="range"
            min="0"
            max="3000"
            step="1"
            v-model.number="maxPrice"
            @change="setChangeSliders"
          />
        </div>
        <div class="rangesPrice">
          <p>Price range:</p>
          <span> minPrice: {{ minPrice }}</span>
          <span> maxPrice: {{ maxPrice }}</span>
        </div>
      </div>
      <!-- <p v-show="sortedProducts.length === 0">no product's with this price</p> -->
      <div class="product-list">
        <div v-for="store in filteredProducts" :key="store._id">
          <div class="product-item">
            <div class="product-item__badge">Sale</div>
            <div class="product-item__rating">
              <div class="product-item__rating-wrap">
                <div class="product-item__rating--off">★★★★★</div>
                <div class="product-item__rating--on" style="width: 85%">
                  ★★★★★
                </div>
              </div>
              <span class="product-item__rating-count">42</span>
            </div>
            <div class="product-item__image">
              <img :src="store.image" alt="product image" />
            </div>
            <a href="#" class="product-item__name"> {{ store.title }}</a>
            <span class="product-item__promotion">{{ store.brand }}</span>
            <span class="product-item__promotion"
              >{{ store.description }}
            </span>
            <div class="product-item__price">{{ store.price }} $</div>
            <span class="product-item__promotion"
              >hurry up there are only {{ store.quantity }} items left</span
            >
            <div class="btn">
              <button
                type="button"
                class="primary-btn"
                @click="addToCart(store)"
              >
                Add to cart
              </button>
              <b-button
                type="is-danger"
                class="secondBtn"
                outlined
                @click="onDelete(store._id)"
                >Delete</b-button
              >
              <b-button
                type="is-success"
                class="thirdBtn"
                outlined
                @click="onEdit(store._id)"
                >Edit</b-button
              >
              <b-button
                type="is-primary"
                class="fourthBtn"
                outlined
                @click="showInfo(store._id), (isCardModalActive = true)"
              >
                Product detail</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vSelect from "../components/v-select.vue";

export default {
  name: "List",
  components: {
    vSelect,
  },

  data() {
    return {
      isInfoVisible: false,
      toggle: false,
      brands: [
        { name: "All", value: "All" },
        { name: "Samsung", value: "Samsung" },
        { name: "Lenovo", value: "Lenovo" },
        { name: "LG", value: "LG" },
      ],
      selected: "All",
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 10000,
      isCardModalActive: false,
    };
  },
  props: {},
  name: "List",
  computed: {
    ...mapGetters("stores", [
      "getStoreList",
      "isLoading",
      "hasError",
      "takeBasket",
    ]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      } else {
        return this.getStoreList;
      }
    },
  },
  methods: {
    ...mapActions("stores", [
      "loadStore",
      "deleteStoreCart",
      "getStoreById",
      "AddToBasket",
    ]),
    onDelete(id) {
      this.deleteStoreCart(id);
    },
    onEdit(id) {
      this.$router.push({ name: "Create", params: { id } });
    },
    showInfo(id) {
      this.$router.push({ name: "Detail", params: { id } });
    },

    addToCart(data) {
      this.AddToBasket(data);
    },
    setChangeSliders() {
      if (this.minPrice > this.maxPrice) {
        let temp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = temp;
      }
      this.sortByBrands();
    },
    sortByBrands(brand) {
      let vm = this;
      this.sortedProducts = [...this.getStoreList];
      this.sortedProducts = this.sortedProducts.filter(function (item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice;
      });
      if (brand) {
        this.sortedProducts = this.sortedProducts.filter(function (el) {
          vm.selected = brand.name;
          return el.brand === brand.name;
        });
      }
    },
  },

  mounted() {
    this.loadStore();
    this.sortByBrands();
  },
};
</script>
<style scoped>
.btn {
  margin-top: 15px;
  width: 150px;
  margin: 5px;
  display: flex;
  flex-direction: column;
}
button {
  cursor: pointer;
}
hr {
  border: none;
  background-color: rgb(119, 118, 118);
  color: rgb(8, 8, 8);
  height: 2px;
  opacity: 0.2;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
}

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 32%;
  padding: 50px 10px 30px 10px;
  margin-bottom: 15px;
  border: 1px solid #ccd0d3;
  border-radius: 3px;
  transition: 0.3s;
}

.product-item:hover {
  border-color: #000;
}
.primary-btn {
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  background-color: #214bff;
  transition: 0.2s;
  margin: 5px;
}
.secondBtn {
  margin: 5px;
}
.thirdBtn {
  margin: 5px;
}
.fourthBtn {
  margin: 5px;
}

.primary-btn:hover {
  background-color: #1f72ff;
}
.product-item__rating {
  position: absolute;
  top: 15px;
  right: 10px;
}

.product-item__rating-wrap {
  float: left;
}

.product-item__rating--off {
  position: absolute;
  top: 0;
  left: 0;
  color: #ccd0d3;
}

.product-item__rating--on {
  position: relative;
  overflow: hidden;
  color: #ffcb01;
}

.product-item__rating-count {
  position: relative;
  top: -1px;
  padding-left: 5px;
  font-size: 10px;
}

.product-item__rating-count:before {
  content: "(";
}

.product-item__rating-count:after {
  content: ")";
}
.product-item__image {
  margin-bottom: 20px;
}

.product-item__image img {
  display: block;
  width: 550px;
  height: 100px;
  margin: auto;
}

.product-item__name {
  margin-bottom: 10px;
  color: #000;
  text-transform: capitalize;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.product-item__promotion {
  margin-bottom: 25px;
  text-transform: capitalize;
  text-align: center;
  font-weight: 300;
  font-size: 15px;
}

.product-item__price {
  margin-bottom: 25px;
  font-weight: 600;
}
.product-item__badge {
  position: absolute;
  top: 10px;
  left: -3px;
  padding: 3px 5px;
  background-color: #ff0000;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 12px;
}
.inBasket {
  position: absolute;
  top: 8px;
  right: 10px;
  padding: 5px;
  border: solid 1px;
}
.filters {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.range-slider {
  margin: auto 16px;
  text-align: center;
  width: 500px;
  margin-top: 15px;
  position: relative;
}
.range-slider svg,
.range-slider input[type="range"] {
  position: absolute;
  left: 0;
  bottom: 0;
}
input[type="range"]::-webkit-slider-thumb {
  z-index: 1;
  position: relative;
  top: 2px;
  margin-top: -7px;
  cursor: pointer;
}
.rangesPrice {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
