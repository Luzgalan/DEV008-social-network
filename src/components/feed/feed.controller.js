import {
  collection, addDoc, getFirestore, getDocs, doc, deleteDoc,
} from 'firebase/firestore';
import { signOut, getAuth } from 'firebase/auth';

/* import { async } from 'regenerator-runtime'; */

/* import { async } from 'regenerator-runtime'; */
import { app } from '../../firebase';

const auth = getAuth();
const db = getFirestore(app);
export const newPost = async ({ publicacion }) => {
  try {
    const docRef = await addDoc(collection(db, 'nuevoPost'), {
      publicacion,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, 'nuevoPost'));
  return querySnapshot;
};

export const logoutSesion = async () => {
  try {
    const result = await signOut(auth);
    console.log(result);
    return (result);
    // Otras acciones después del cierre de sesión, si las hay...
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Error during logout:');
  }
};

export const deletePost = async () => {
  await deleteDoc(doc(db, 'nuevoPost'));
  console.log(deletePost);
  return deletePost;
};
