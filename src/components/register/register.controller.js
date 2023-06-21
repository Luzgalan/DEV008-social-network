// import { collection, addDoc, getFirestore } from 'firebase/firestore';
// import { async } from 'regenerator-runtime';
/* import { app } from '../../firebase';
//Para post
const db = getFirestore(app);
export const crearUsuario = async ({ nombre, email, edad }) => {
  try {
    const docRef = await addDoc(collection(db, 'usuario'), {
      nombre,
      email,
      edad,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}; */

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
export const signInUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      window.alert('Usuario registrado correctamente');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const equalPassword = document.getElementById('distintas-contrasenas');
      const firstPassword = document.createElement('p');
      console.log(errorCode, errorMessage);

      if (error.code === 'auth/email-already-in-use') {
        firstPassword.textContent = 'El correo electrónico ya está registrado';
        equalPassword.appendChild(firstPassword);
      } else if (error.code === 'auth/weak-password') {
        firstPassword.textContent = 'La contraseña debe tener al menos 6 caracteres';
        equalPassword.appendChild(firstPassword);
      } else {
        firstPassword.textContent = (`El correo electrónico ya está registrado${error.message}`);
        equalPassword.appendChild(firstPassword);
      }

      document.getElementById('formCrearcuenta').reset;

      // ..
    });
};
