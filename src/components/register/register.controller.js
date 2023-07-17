import {
  getAuth, createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  collection, addDoc, getFirestore,

} from 'firebase/firestore';

import { app } from '../../firebase';

const auth = getAuth();

// Guardamos el nombre, correo y foto para mostrar en el feed
const db = getFirestore(app);
export const docRef1 = (nombre, email) => {
  addDoc(collection(db, 'usuarioPrueba'), {
    name: nombre,
    email,
    photoUrl: 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png',
  });
};

// Funcion para registrarse por formulario
export const signInUser = (nombre, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // si se registra correctamente se direcciona al feed tomando el nombre y correo electronico
      docRef1(nombre, email);
      const user = userCredential.user;
      window.history.pushState({}, '', `${window.location.origin}/`);
      window.dispatchEvent(new PopStateEvent('popstate'));

      console.log(user);
    })
    .catch((error) => {
      // si existe algun error aparecen errores si el email ya se encuentra registrado,
      // o si tiene mas de 6 caracteres
      const errorCode = error.code;

      if (errorCode === 'auth/email-already-in-use') {
        document.getElementById('repeat-email').style.display = 'block';
      } else if (errorCode === 'auth/weak-password') {
        document.getElementById('6-letters').style.display = 'block';
      } else {
        document.getElementById('7-letter').style.display = 'block';
      }
    });
};
