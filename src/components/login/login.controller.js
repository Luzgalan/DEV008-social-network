import {
  collection, addDoc, getFirestore, query, where, getDocs,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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
export const createUser = async (name, email, photoUrl) => {
  try {
    await addDoc(collection(db, 'usuarioPrueba'), {
      name,
      email,
      photoUrl,
    });
  } catch (error) {
    alert('Ocurrio un error al iniciar sesión =>', error);
  }
};

/**
 * Obtiene un susario de la base de datos por el email
 * @date 16/6/2023 - 12:22:44
 *
 * @async
 * @param {string} email email del usuario
 * @returns {Object} El usuario si existe si
 */
export const getUserByEmail = async (email) => {
  const q = query(collection(db, 'usuarioPrueba'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

/**
 * Inicia el Login con Googl
 * @date 18/6/2023 - 22:18:00
 */
export const loginWithGoogle = async () => {
  // Peticion de google para lanzar el modal
  const userCrendential = await signInWithPopup(auth, provider);

  // Obtenemos el token y lo guardamos en el Local Storage
  const credential = GoogleAuthProvider.credentialFromResult(userCrendential);
  const token = credential.accessToken;
  localStorage.setItem('accessToken', token);

  // Obtencion de la informacion del usuario que inicio sesion
  const user = userCrendential.user;

  // Verificacion si existe el usuario en Firestore si no existe lo creamos
  const hasUser = await getUserByEmail(user.email);
  if (hasUser.docs.length === 0) {
    await createUser(user.displayName, user.email, user.photoURL);
  }

  //  Redireccionamiento del usuario al feeds
  window.history.pushState({}, '', `${window.location.origin}/feed`);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
