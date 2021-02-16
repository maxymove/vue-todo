<template>
  <v-app id="app">
    <div><nav-bar></nav-bar></div>
    <div>
      <v-btn @click="signOut">sign out</v-btn>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  methods: {
    ...mapActions(['onAuthChangedAction', 'signOutAction']),
    signOut() {
      this.signOutAction();
    },
  },
  mounted() {
    this.onAuthChangedAction();
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
