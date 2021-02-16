<template>
  <v-app>
    <!-- This is user's main application page -->
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
        <!-- {{ currentTodos }} -->
        <v-card >
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">done?</th>
                  <th class="text-center">task</th>
                  <!-- <th class="text-center">status</th> -->
                  <th>Progess (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="todo in filteredTodos" :key="todo.id">
                  <!-- <td>
                    {{ todo.uid }}
                </td> -->
                  <td>
                    <v-checkbox
                      v-model="todo.isDone"
                      @click="updateTodo(todo.uid, todo.isDone)"
                    ></v-checkbox>
                  </td>
                  <td v-if="!todo.isDone" @click="focus()">
                    {{ todo.text }}
                    <!-- <btn @click="deleteTodo(todo.uid)">delete</btn> -->
                  </td>
                  <td v-else>
                    <del>{{ todo.text }}</del>
                  </td>
                  <td>{{todo.progress}}%</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div>

          </div>
        </v-card>
      </div>
    </v-container>

    <v-container>
      <v-row align="center" justify="space-around">
        <v-btn depressed @click="changeFilter('all')"> All </v-btn>
        <v-btn depressed color="primary" @click="changeFilter('active')">
          Active
        </v-btn>
        <v-btn depressed color="error" @click="changeFilter('completed')">
          Completed
        </v-btn>
        <v-btn depressed @click="changeFilter('hidden')"> Hidden </v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      newTodo: '',
      focusTodo: {},
    };
  },
  created() {
    this.readTodos();
  },
  computed: {
    ...mapGetters(['currentTodos', 'filteredTodos']),
  },
  methods: {
    async clearNewTodo() {
      this.newTodo = '';
    },
    ...mapActions([
      'changeFilterAction',
      'createTodoAction',
      'readTodosAction',
      'updateTodoAction',
      'deleteTodoAction',
    ]),
    createTodo() {
      this.createTodoAction({ text: this.newTodo });
      this.clearNewTodo();
    },
    readTodos() {
      this.readTodosAction();
    },
    updateTodo(uid, isDone) {
      this.updateTodoAction({ uid, isDone });
    },
    changeFilter(filter) {
      this.changeFilterAction(filter);
    },
    deleteTodo(uid) {
      this.deleteTodoAction({ uid });
    },
  },
};
</script>

<style>
</style>
