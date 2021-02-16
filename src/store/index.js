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
          db.collection('users').doc(user.uid).collection('todos').add({
          })
            .then((docRef) => {
              console.log('Document written with ID: ', docRef.id);
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error);
        });
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
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
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
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
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
            console.log(doc.id, ' => ', doc.data());
            tmpTodos.push(doc.data());
          });
        });
      context.commit('setTodos', tmpTodos);
    },

  },
  modules: {
  },
});
