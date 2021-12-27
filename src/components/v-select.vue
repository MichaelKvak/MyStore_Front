<template>
  <div class="select">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="options" v-if="areOptionsVisible">
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "v-select",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect);
  },
};
</script>
<style scoped>
.select {
  position: relative;
  width: 200px;
  cursor: pointer;
  z-index: 10;
}
.select p {
  margin: 0;
}
.title {
  border: solid 1px #aeaeae;
  font-size: 2rem;
  font-weight: 100;
}
.options {
  border: solid 1px #aeaeae;
  position: absolute;
  top: 37px;
  right: 0;
  width: 100%;
  background: #e7e7e7;
}
.options p:hover {
  background: #acaaaa;
}
</style>
