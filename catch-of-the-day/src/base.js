import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBngvaNca1Q8PgeUUHpLuSwL-Vj3xsB5HA',
  authDomain: 'catch-of-the-day-juice.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-juice-default-rtdb.firebaseio.com',
});

const base = getDatabase(firebaseApp);

export { firebaseApp };

export default base;
