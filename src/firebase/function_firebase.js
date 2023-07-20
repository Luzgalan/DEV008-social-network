// import { auth } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';

export const createUser = (email, contrasena) => {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, contrasena)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
