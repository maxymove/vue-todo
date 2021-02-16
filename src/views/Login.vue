<template>
  <v-app>
    <!-- <v-container> -->
      <!-- <v-card width="500" class="mx-center" -->
      <v-form lazy-validation>
        <v-text-field v-model="email" label="E-mail" required></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-text-field
        label="Confirm password"
        type="password"
        required
      ></v-text-field>

        <v-btn color="success" class="mr-4" @click="signIn"> Sign in </v-btn>
      </v-form>
    <!-- </v-card> -->
    <!-- </v-container> -->

  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions(['signInAction']),
    signIn() {
      this.signInAction({ email: this.email, password: this.password });
    },
  },
};
</script>

<style>
</style>
