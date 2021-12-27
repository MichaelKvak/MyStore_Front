<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <a href="" class="header__logo"></a>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }"
          >List</b-navbar-item
        >

        <b-navbar-item tag="router-link" :to="{ path: '/create/' }"
          >Create</b-navbar-item
        >
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link
              v-if="!isAuthenticated()"
              to="/signup"
              class="button is-rounded is-primary is-small"
            >
              <strong>Sign up</strong>
            </router-link>
            <router-link
              v-if="!isAuthenticated()"
              to="/login"
              class="button is-rounded is-primary is-small"
            >
              <strong>Log in</strong>
            </router-link>

            <button v-if="isAuthenticated()" @click="onLogout">Log out</button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view> </router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    onLogout() {
      this.logout();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #080808;
  margin-top: 60px;
}
.header__logo {
  position: absolute;
  top: -59px;
  width: 110px;
  height: 100px;
  background: url("../img/logo.png") no-repeat center;
  background-size: contain;
}
.navbar-menu {
  margin-left: 100px;
}
button {
  cursor: pointer;
}
</style>
