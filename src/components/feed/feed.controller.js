/* eslint-disable max-len */
/* eslint-disable no-shadow */
import {
  collection, addDoc, getFirestore, onSnapshot, doc, deleteDoc, updateDoc, orderBy, query, getDocs, where, getDoc,
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
      author: localStorage.getItem('username'), // Le asignamos el autor al post
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

// Consulta para traer un usuario
export const getDataUser = () => {
  const q = query(collection(db, 'usuarioPrueba'), where('email', '==', localStorage.getItem('email')));
  return getDocs(q)
    .then((querySnapshot) => {
      console.log(querySnapshot);
      return querySnapshot.docs[0].data();
    })
    .catch((error) => {
      throw error;
    });
};
