import { loginWithGoogle, loginWithPassword } from './login.controller';
import logo from '../../img/logo.png';

const login = {
  loadHTML: () => `
  <div class="l-div">
    <div class="l-container">
        <div class="l-container-login">
        <img class="imgResponsive" src="./../../img/logo.png" alt="PET LOVERS">

            <p class="text-title">Inicia sesión</p>
            <div id="btnLoginGoogle">
            <img width="40" height="40" viewBox="0 0 64 64" src="https://cdn-icons-png.flaticon.com/512/300/300221.png">
            </div>
            <p class="text-small">O con tu cuenta</p>
            <form id="formLogin" class="l-container-form">

            <div class="l-input-with-icon">
                <input type="email" required id="iptEmail" placeholder="Correo electrónico">
                <i class="fas fa-user"></i>
            </div>

            <div class="l-input-with-icon">
                <input type="password" required id="iptPassword"  placeholder="Contraseña">
                <i class="fas fa-lock"></i>
            </div>

            <div>
                <button id="btnLoginPassword" class="l-button-login">Ingresar</button>
                <p id="messageError" style="display: none"> Usuario/contraseña son invalidos</p>
                <p class="text-small">¿No tienes cuenta?
                    <span class="text-color-orange manita" id="spnNuevaCuenta">Crea una aquí</span>
                </p>
            </div>
            </form>
            
        </div>
        
        <div class="l-container-informacion">
            <p class="text-title text-color-white">Bienvenidos a:</p>
            <img src="${logo}" alt="">
            <p class="text-color-white">Somos un espacio en donde podras consultar o publicar información acerca de
                nuestros amigos de 4 patitas.
            </p>
        </div>
    </div>
</div>`,

  loadEvents: () => {
    /* -------------------------- Navegacion a register ------------------------- */
    document.getElementById('spnNuevaCuenta').addEventListener('click', () => {
      window.history.pushState({}, '', `${window.location.origin}/register`);
      /* ----- Dispara manualmente el evento popstate para actualizar la ruta ----- */
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    /* ----------------------------- Inniciar sesion con google---------------------------- */
    document.getElementById('btnLoginGoogle').addEventListener('click', async () => {
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

    /* ----------------- inciar sesion con usuario y contraseña ----------------- */

    document.getElementById('formLogin').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('iptEmail').value;
      const password = document.getElementById('iptPassword').value;

      loginWithPassword(email, password)
        .then(() => {
          //  Redireccionamiento del usuario al feeds
          window.history.pushState({}, '', `${window.location.origin}/feed`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }).catch(() => {
          document.getElementById('messageError').style.display = 'block';
        });
    });

    function ocultarError() {
      document.getElementById('messageError').style.display = 'none';
    }
    document.getElementById('iptEmail').addEventListener('focus', ocultarError);
    document.getElementById('iptPassword').addEventListener('focus', ocultarError);
  },
};
export default login;
