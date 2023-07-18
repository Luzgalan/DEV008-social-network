/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBcKxh-RAJ5tbkvevJz7JJLlJXeLUJqfiU',
  authDomain: 'pet-lovers-a0c33.firebaseapp.com',
  projectId: 'pet-lovers-a0c33',
  storageBucket: 'pet-lovers-a0c33.appspot.com',
  messagingSenderId: '348333556906',
  appId: '1:348333556906:web:83992e5ad022fa6e917cd3',
  measurementId: 'G-D0TZTYL4PJ',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
