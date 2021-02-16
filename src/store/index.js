import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import router from '../router/index';
import db from '../plugins/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      authenticated: false,
      uid: null,
      data: null,
    },
    todos: [],
    filter: 'all',
    activeRemaining: null,
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
    authenticated(state) {
      return state.user.authenticated;
    },
    currentTodos(state) {
      return state.todos;
    },
    filteredTodos(state) {
      if (state.filter === 'all') {
        return state.todos;
      } if (state.filter === 'active') {
        return state.todos.filter((todo) => !todo.isDone);
      }
      return state.todos.filter((todo) => todo.isDone);
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user.uid = payload.uid;
      state.user.data = payload;
      state.user.authenticated = payload !== null;
    },
    clearUser(state) {
      state.user.data = null;
      state.user.authenticated = false;
      state.user.uid = null;
    },
    setTodos(state, payload) {
      state.todos = payload;
    },
    setFilter(state, payload) {
      state.filter = payload;
    },
    clearTodos(state) {
      state.todos = [];
    },
  },
  actions: {
    // AUTHENTICATION
    signUpAction(context, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          console.log(user);
          // register user into databse by users/user{uid}
          // router.replace('/Login');

          // db.collection('users').doc(user.uid).collection('todos').add({
          // })
          //   .then((docRef) => {
          //     console.log('Document written with ID: ', docRef.id);
          //   })
          //   .catch((error) => {
          //     console.error('Error adding document: ', error);
          //   });
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error);
        });
      router.replace('/Login');
    },

    signInAction(context, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          context.commit('setUser', user);
          router.replace('/app');
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error);
        });
    },

    signOutAction(context) {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        context.commit('clearUser');
        router.replace('/Login');
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
      context.commit('clearTodos');
    },

    onAuthChangedAction(context) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const { uid } = user;
          // ...
          context.commit('setUser', user);
          // BUG = when sign up, it will also sign in
        } else {
          // User is signed out
          // ...
        }
      });
    },
    // other
    createTodoAction(context, payload) {
      db.collection('users').doc(this.getters.currentUser.uid).collection('todos').add({
        text: payload.text,
        isDone: false,
        isEditing: false,
        isHidden: false,
        timestamp: new Date().toISOString(),
        subtask: [],
        progress: '0',
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          // this.dispatch('updateTodoUidAction', { uid: docRef.id });
          this.dispatch('readTodosAction');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },

    readTodosAction(context) {
      const tmpTodos = [];
      db.collection('users').doc(this.getters.currentUser.uid).collection('todos').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
            // console.log(doc.id);
            const tmpDocData = doc.data();
            tmpDocData.uid = doc.id;
            tmpTodos.push(tmpDocData);
          });
        });
      context.commit('setTodos', tmpTodos);
    },

    updateTodoAction(context, payload) {
      const washingtonRef = db.collection('users').doc(this.getters.currentUser.uid).collection('todos').doc(payload.uid);

      // Set the "capital" field of the city 'DC'
      return washingtonRef.update({
        isDone: payload.isDone,
      })
        .then(() => {
          console.log('Document successfully updated!');
          this.dispatch('readTodosAction');
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    },

    changeFilterAction(context, payload) {
      context.commit('setFilter', payload);
    },

    deleteTodoAction(context, payload) {
      db.collection('users').doc(this.getters.currentUser.uid).collection('todos').doc(payload.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.dispatch('readTodosAction');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },

  },
  modules: {
  },
});
