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

    <v-container>
        <div>
            {{ currentTodos }}
        </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      newTodo: '',
    };
  },
  created() {
    this.readTodos();
  },
  computed: {
    ...mapGetters(['currentTodos']),
  },
  methods: {
    async clearNewTodo() {
      this.newTodo = '';
    },
    ...mapActions(['createTodoAction', 'readTodosAction']),
    createTodo() {
      this.createTodoAction({ text: this.newTodo });
      this.clearNewTodo();
    },
    readTodos() {
      this.readTodosAction();
    },
  },
};
</script>

<style>
</style>
