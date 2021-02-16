import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDo8tqI-Ugx9EDbBYnJnj_hAJt_nZn0uMc',
  authDomain: 'todo-app-d5827.firebaseapp.com',
  projectId: 'todo-app-d5827',
  storageBucket: 'todo-app-d5827.appspot.com',
  messagingSenderId: '770485880335',
  appId: '1:770485880335:web:fd3ac8eed2eb9df37c457a',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
