import {
  collection, addDoc, getFirestore, getDocs, doc, deleteDoc,
} from 'firebase/firestore';

import { app } from '../../firebase';

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

export const deletePost = async () => {
  const eliminandoPost = deleteDoc(doc(db, 'nuevoPost', ''));
  console.log(eliminandoPost);
  return eliminandoPost;
};
