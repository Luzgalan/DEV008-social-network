// import { crearUsuario } from './register.controller';

import { signInUser } from './register.controller';
import { loginWithGoogle } from '../login/login.controller';

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
            <img class="imgResponsive" src="./../../img/logo.png" >
            <input type="text" placeholder="Nombre" required id="nombre" class="ingresa"> 
            <input type="email" placeholder="Correo electrónico" required id="correo" class="ingresa"> 
            <input type="password" placeholder="Contraseña" required id="contrasena" class="ingresa"> 
            <input type="password" placeholder="Confirmar contraseña" required id="confirmar-contrasena"
                class="ingresa"> 
            <button type=""submit id="Crearcuenta">Crear cuenta</button>
            <div id="distintas-contrasenas"> </div>
            <p id="repeat-password" style="display: none"> Las contraseñas no coinciden </p>
            <p id="repeat-email" style="display: none"> El correo se encuentra registrado </p>
            <p id="6-letters" style="display: none"> La contraseña debe contener al menos 6 caracteres </p> 
            <p id="7-letters" style="display: none"> Correo o contraseña inválidos </p> 
            
            <p class="text-small">¿Ya tienes una cuenta registrada?
                    <span class="text-color-orange manita" id="spnRegistro">Ingresa aquí</span>
                </p>
              
            <h3 class="text-small"> O ingresa con tu cuenta de Google</h3>
            <div id="btnLoginGoogle">
                <img width="40" height="40" viewBox="0 0 64 64" src="https://cdn-icons-png.flaticon.com/512/300/300221.png">
                    
                
            </div>  
        </form>
  
    </div>
  </section>`,
  loadEvents: () => {
    document.getElementById('formCrearcuenta').addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('correo').value;
      const contrasena = document.getElementById('contrasena').value;
      const confirmarContrasena = document.getElementById('confirmar-contrasena').value;

      if (contrasena === confirmarContrasena) {
        signInUser(nombre, email, contrasena);

        console.log(nombre, email);
      } else {
        document.getElementById('repeat-password').style.display = 'block';
      }
    });

    /* -------------------------- Navegacion a login ------------------------- */
    document.getElementById('spnRegistro').addEventListener('click', () => {
      window.history.pushState({}, '', `${window.location.origin}/`);
      /* ----- Dispara manualmente el evento popstate para actualizar la ruta ----- */
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    /* ----------------------------- Iniciar sesion con google---------------------------- */

    document.getElementById('btnLoginGoogle').addEventListener('click', async () => {
      document.getElementById('btnLoginGoogle').disabled = true;
      // Inicio de sesion con google
      loginWithGoogle()
        .then(() => {
          //  Redireccionamiento del usuario al feeds
          window.history.pushState({}, '', `${window.location.origin}/feed`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }).catch(() => {
          document.getElementById('messageError').style.display = 'block';
        });
    });

    function ocultarError() {
      document.getElementById('repeat-password').style.display = 'none';
      document.getElementById('repeat-email').style.display = 'none';
      document.getElementById('6-letters').style.display = 'none';
      document.getElementById('7-letters').style.display = 'none';
    }
    document.getElementById('correo').addEventListener('focus', ocultarError);
    document.getElementById('contrasena').addEventListener('focus', ocultarError);
    document.getElementById('confirmar-contrasena').addEventListener('focus', ocultarError);
  },
};

export default register;
