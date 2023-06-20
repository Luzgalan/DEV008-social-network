import { collection, addDoc, getFirestore } from 'firebase/firestore';
//import { async } from 'regenerator-runtime';
import { app } from '../../firebase';
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
};
