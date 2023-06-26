/* eslint-disable no-underscore-dangle */
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { app } from '../../firebase';

const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

/**
 * Crea un usuario en la base de datos
 * @date 16/6/2023 - 10:26:17
 *
 * @async
 * @param {string} name nombre del usuario que inicia sesión
 * @param {string} email correo del usuario que inicio sesion
 * @param {string} photoUrl imagen de usuario
 * @returns {*}
 */
export const createUser = (name, email, photoUrl) => {
  addDoc(collection(db, 'usuarioPrueba'), {
    name,
    email,
    photoUrl,
  }).catch((error) => {
    throw error;
  });
};

/**
 * Obtiene un susario de la base de datos por el email
 * @date 16/6/2023 - 12:22:44
 *
 * @async
 * @param {string} email email del usuario
 * @returns {Object} El usuario si existe si
 */

export const getUserByEmail = (email) => {
  const q = query(collection(db, 'usuarioPrueba'), where('email', '==', email));
  return getDocs(q)
    .then((arrayConsulta) => {
      return arrayConsulta;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * Inicia el Login con Googl
 * @date 18/6/2023 - 22:18:00
 */

export const loginWithGoogle = () => {
  // Peticion de google para lanzar el modal
  return signInWithPopup(auth, provider)
    .then((userCredential) => {
      // Obtenemos el token y lo guardamos en el Local Storage
      // const credential = GoogleAuthProvider.credentialFromResult(userCredential);
      const token = userCredential._tokenResponse.oauthIdToken;
      localStorage.setItem('accessToken', token);

      // Obtencion de la informacion del usuario que inicio sesion
      const user = userCredential.user;

      localStorage.setItem('email', userCredential.user.email);
      // Verificacion si existe el usuario en Firestore si no existe lo creamos
      return getUserByEmail(user.email)
        .then((consulta) => {
          if (consulta.docs.length === 0) {
            createUser(user.displayName, user.email, user.photoURL);
          }
          return true;
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * login por usuario y contraseña
 * @date 21/6/2023 - 16:03:05
 *
 * @param {*} email
 * @param {*} password
 */
export const loginWithPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Obtenemos el token  y el email y lo guardamos en el Local Storage
      const token = userCredential.user.accessToken;
      localStorage.setItem('accessToken', token);
      const mail = userCredential.user.email;
      localStorage.setItem('email', mail);
      return true;
    })
    .catch((error) => {
      throw error;
    });
};
