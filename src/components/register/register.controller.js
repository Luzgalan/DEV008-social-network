import {
  getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';

const auth = getAuth();

export const signInUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const equalPassword = document.getElementById('distintas-contrasenas');
      const firstPassword = document.createElement('p');
      console.log(user);
      document.getElementById('distintas-contrasenas').innerText = '';
      firstPassword.textContent = 'Usuario registrado correctamente';
      equalPassword.appendChild(firstPassword);
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
        // firstPassword.textContent = (`El correo electrónico ya está registrado${error.message}`);
        // equalPassword.appendChild(firstPassword);
        firstPassword.textContent = '';
        equalPassword.appendChild(firstPassword);
      }

      // document.getElementById('formCrearcuenta').reset;

      // ..
    });
};
const provider = new GoogleAuthProvider();

export const authenticateWithGoogle = () => signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    return { token, user };
  })
  .catch((error) => {
    console.error('Error during Google authentication:', error);
    throw error;
  });
