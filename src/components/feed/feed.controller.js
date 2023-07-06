/* eslint-disable no-shadow */
import {
  collection, addDoc, getFirestore, onSnapshot, doc, deleteDoc, updateDoc, orderBy, query,
} from 'firebase/firestore';
import { signOut, getAuth } from 'firebase/auth';

import { app } from '../../firebase';

const auth = getAuth();
const db = getFirestore(app);
export const newPost = async ({ publicacion }) => {
  try {
    const docRef = await addDoc(collection(db, 'nuevoPost'), {
      publicacion,
      createdAt: Date.now(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const subscribeToDataChanges = (actualizarFeed) => {
  return onSnapshot(query(collection(db, 'nuevoPost'), orderBy('createdAt', 'asc')), (snapshot) => {
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    actualizarFeed(data);
  });
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

export const deletePost = async (docId) => {
  console.log(docId);
  try {
    await deleteDoc(doc(db, 'nuevoPost', docId));
    console.log(`Documento eliminado: ${docId}`);
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
  }
};

export const updatePost = async (saveId, publicacion) => {
  return updateDoc(doc(db, 'nuevoPost', saveId), {
    publicacion,
  });
};
