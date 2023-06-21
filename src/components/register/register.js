//import { crearUsuario } from './register.controller';

import { signInUser } from "./register.controller";

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
            <input type="text" placeholder="Nombre" required id="nombre" class="ingresa"> <!--<i
                class="fa-solid fa-user"></i>--><br>
            <input type="email" placeholder="Correo electrónico" required id="correo" class="ingresa"> <!--<i
                class="fa-solid fa-envelope"></i> --><br>
            <input type="password" placeholder="Contraseña" required id="contrasena" class="ingresa"> <!--<i
                class="fa-solid fa-lock"></i>--> <br>
            <input type="password" placeholder="Confirmar contraseña" required id="confirmar-contrasena"
                class="ingresa"> <!--<i
                class="fa-solid fa-lock"></i>--><br>
            <button type=""submit id="Crearcuenta">Crear cuenta</button>
            <div id="distintas-contrasenas"> </div> 
            <h3 class="text-small"> O ingresa con tu cuenta de Google</h3>
            <a href="https://www.google.com/intl/es/account/about/"><img src="../../img/google-removebg-preview.png"
                    id="Google"></a>
        </form>
  
    </div>
  </section>`,
  loadEvents: async () => {
    document.getElementById('formCrearcuenta').addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('correo').value;
      const contrasena = document.getElementById('contrasena').value;
      const confirmarContrasena = document.getElementById('confirmar-contrasena').value;
      const equalPassword = document.getElementById('distintas-contrasenas');
      const firstPassword = document.createElement('p');
      if (contrasena === confirmarContrasena) {
        signInUser(email, contrasena);
      } else {
        firstPassword.textContent = 'Las contraseñas no coinciden';
        equalPassword.appendChild(firstPassword);
        //formCrearcuenta.reset(); en caso de que se quiera resetear el formulario //
        return;
      }
    });
  },
};

export default register;

