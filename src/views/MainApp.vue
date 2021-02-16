<template>
  <v-app>
    This is user's main application page
    <v-container>
      <div>
        <v-text-field
          v-model="newTodo"
          label="Enter to add a new todo"
          @keyup.enter="createTodo"
        ></v-text-field>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newTodo: '',
    };
  },
  methods: {
    async clearNewTodo() {
      this.newTodo = '';
    },
    ...mapActions(['createTodoAction']),
    createTodo() {
      this.createTodoAction({ text: this.newTodo });
      this.clearNewTodo();
    },

    readTodos() {

    },
  },
};
</script>

<style>
</style>
