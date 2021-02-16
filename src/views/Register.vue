<template>
  <v-app>
    <v-form lazy-validation>

      <v-text-field
        v-model="email"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="signUp" >
        Sign up
      </v-btn>
    </v-form>
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
    ...mapActions(['signUpAction']),
    signUp() {
      this.signUpAction({ email: this.email, password: this.password });
    },
  },
};
</script>

<style>
</style>
