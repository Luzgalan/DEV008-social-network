import { crearUsuario } from './register.controller';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const registerUser = () => {
  const viewRegisterUser = document.createElement('div');
  const userView = ` <section>
  <div class="contenedor-crear-cuenta">
      <div class="logo-cuenta">
          <p class="text-title text-color-white" id="bienvenido">Bienvenidos a:</p>
          <img src="../../img/logo.png" class="marca">
          <p class="text-color-white">Somos un espacio en donde podrás consultar o publicar información acerca de
              nuestros amigos de 4
              patitas
          </p>
      </div>

      <div class="formulario-cuenta">
          <h1 class="text-title">Crear cuenta</h1>
          <input type="text" placeholder="Nombre" required id="nombre" class="ingresa"> <!--<i
              class="fa-solid fa-user"></i>--><br>
          <input type="email" placeholder="Correo electrónico" required id="correo" class="ingresa"> <!--<i
              class="fa-solid fa-envelope"></i> --><br>
          <input type="password" placeholder="Contraseña" required id="contrasena" class="ingresa"> <!--<i
              class="fa-solid fa-lock"></i>--> <br>
          <input type="password" placeholder="Confirmar contraseña" required id="confirmar contrasena"
              class="ingresa"> <!--<i
              class="fa-solid fa-lock"></i>--><br>
          <button onclick="registrar()" id="Crearcuenta">Crear cuenta</button>
          <h3 class="text-small"> O ingresa con tu cuenta de Google</h3>
          <a href="https://www.google.com/intl/es/account/about/"><img src="../../img/google-removebg-preview.png"
                  id="Google"></a>
      </div>

  </div>
</section>`;
  viewRegisterUser.innerHTML = userView

  return viewRegisterUser;
}


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

/*function registrar() {
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
}*/