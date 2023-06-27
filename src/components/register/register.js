// import { crearUsuario } from './register.controller';

import {
  getAuth, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';
import { signInUser, authenticateWithGoogle } from './register.controller';

const register = {
  loadHTML: () => `<section>
    <div class="contenedor-crear-cuenta">
        <div class="logo-cuenta">
            <p class="text-title text-color-white" id="bienvenido">Bienvenidos a:</p>
            <img src="../../img/logo.png" class="marca">
            <p class="text-color-white">Somos un espacio en donde podrás consultar o publicar información acerca de
                nuestros amigos de 4
                patitas
            </p>
        </div>
  
        <form class="formulario-cuenta" id="formCrearcuenta">
            <h1 class="text-title">Crear cuenta</h1>
            <input type="text" placeholder="Nombre" required id="nombre" class="ingresa"> <i class="fas fa-user"></i> 
            <input type="email" placeholder="Correo electrónico" required id="correo" class="ingresa"> <i class="fas fa-user"></i> 
            <input type="password" placeholder="Contraseña" required id="contrasena" class="ingresa"> <i class="fas fa-lock"></i> 
            <input type="password" placeholder="Confirmar contraseña" required id="confirmar-contrasena"
                class="ingresa"> <i class="fas fa-lock"></i> 
            <button type=""submit id="Crearcuenta">Crear cuenta</button>
            <div id="distintas-contrasenas"> </div> 
            <p class="text-small">¿Ya tienes una cuenta registrada?
                    <span class="text-color-orange manita" id="spnRegistro">Ingresa aquí</span>
                </p>
              
            <h3 class="text-small"> O ingresa con tu cuenta de Google</h3>
            <div id="Google">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFA500" width="30" height="30" viewBox="0 0 64 64">
                    <path
                        d="M61.5016 29.2001H32.8016V37.7001H53.4016C52.3016 49.5001 42.7016 54.6001 33.4016 54.6001C21.6016 54.6001 11.1016 45.4001 11.1016 32.1001C11.1016 19.3001 21.1016 9.60011 33.4016 9.60011C42.8016 9.60011 48.5016 15.7001 48.5016 15.7001L54.3016 9.60011C54.3016 9.60011 46.5016 1.10011 33.0016 1.10011C15.2016 1.00011 1.60156 15.9001 1.60156 32.0001C1.60156 47.6001 14.4016 63.0001 33.3016 63.0001C50.0016 63.0001 62.0016 51.7001 62.0016 34.8001C62.1016 31.3001 61.5016 29.2001 61.5016 29.2001Z" />
                </svg>
            </div>  
        </form>
  
    </div>
  </section>`,
  loadEvents: async () => {
    document.getElementById('formCrearcuenta').addEventListener('submit', (event) => {
      event.preventDefault();
      // const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('correo').value;
      const contrasena = document.getElementById('contrasena').value;
      const confirmarContrasena = document.getElementById('confirmar-contrasena').value;
      const equalPassword = document.getElementById('distintas-contrasenas');
      const firstPassword = document.createElement('p');
      if (contrasena === confirmarContrasena) {
        signInUser(email, contrasena);

        window.history.pushState({}, '', `${window.location.origin}/feed`);
        /* ----- Dispara manualmente el evento popstate para actualizar la ruta ----- */
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        firstPassword.textContent = 'Las contraseñas no coinciden';
        equalPassword.appendChild(firstPassword);
        // formCrearcuenta.reset(); en caso de que se quiera resetear el formulario //
      }
    });

    /* -------------------------- Navegacion a login ------------------------- */
    document.getElementById('spnRegistro').addEventListener('click', () => {
      window.history.pushState({}, '', `${window.location.origin}/`);
      /* ----- Dispara manualmente el evento popstate para actualizar la ruta ----- */
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    /* ----------------------------- Iniciar sesion con google---------------------------- */

    const button = document.getElementById('Google');

    // Agrega un controlador de eventos al elemento

    button.addEventListener('click', async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      signInWithPopup(auth, provider);
      try {
        const { token, user } = await authenticateWithGoogle();
        // Realiza las acciones necesarias con el token y el usuario
        console.log('Token:', token);
        console.log('User:', user);
        // ...
      } catch (error) {
        // Maneja el error si es necesario
        console.error('Error:', error);
      }
    });
  },
};

export default register;
