import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { crearUsuario } from './register.controller';

const register = {
  loadHTML: async () => {
    const templateHTML = await fetch('components/register/register.html');
    return templateHTML.text();
  },
  loadEvents: async () => {
    document.getElementById('Crearcuenta').addEventListener('click', async () => {
      document.getElementById('Crearcuenta').disabled = true;
      await crearUsuario({ nombre: 'Karen', email: 'love@gmail.com', edad: '18' });
    });
  },
};

export default register;

function registrar() {
  const email = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;

  console.log(email);
  console.log(contrasena);

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, contrasena)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
