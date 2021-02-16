<template>
  <v-app>
    <v-card>
      <v-tabs fixed-tabs background-color="white">
        <!-- <v-tab :to="{ name: 'profile' }"> profile </v-tab> -->
        <v-tab :to="{ name: 'Login' }"> login </v-tab>
        <v-tab :to="{ name: 'Register' }"> register </v-tab>
        <v-spacer></v-spacer>
        <v-tab :to="{ name: 'App' }"> app </v-tab>
      </v-tabs>
    </v-card>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['signOutAction']),
    signOut() {
      this.signOutAction();
    },
  },
};

</script>

<style>
</style>
