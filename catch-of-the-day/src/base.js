import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import { initializeApp } from '.firebase/app';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCL8sb_OtFDwDu5fFKcHDNFTsbD5ytAsWI',
  authDomain: 'catch-of-the-day2-juice.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day2-juice-default-rtdb.firebaseio.com',
});

export const auth = getAuth(firebaseApp);
const base = getDatabase(firebaseApp);

export default base;
