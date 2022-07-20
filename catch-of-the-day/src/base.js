import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBngvaNca1Q8PgeUUHpLuSwL-Vj3xsB5HA',
  authDomain: 'catch-of-the-day-juice.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-juice-default-rtdb.firebaseio.com',
});

const base = firebaseApp.database();

export { firebaseApp };

export default base;
