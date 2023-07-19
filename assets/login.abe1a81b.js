import { l as loginWithGoogle, a as loginWithPassword } from "./login.controller.1f2674a3.js";
import "./firebase.4377bee5.js";
const login = {
  loadHTML: () => `
  <div class="l-div">
    <div class="l-container">
        <div class="l-container-login">
        <img class="imgResponsive" src="./../../img/logo.png" >

            <p class="text-title">Inicia sesi\xF3n</p>
            <div id="btnLoginGoogle">
            <img width="40" height="40" viewBox="0 0 64 64" src="https://cdn-icons-png.flaticon.com/512/300/300221.png">
            </div>
            <p class="text-small">O con tu cuenta</p>
            <form id="formLogin" class="l-container-form">

            <div class="l-input-with-icon">
                <input type="email" required id="iptEmail" placeholder="Correo electr\xF3nico">
                <i class="fas fa-user"></i>
            </div>

            <div class="l-input-with-icon">
                <input type="password" required id="iptPassword"  placeholder="Contrase\xF1a">
                <i class="fas fa-lock"></i>
            </div>

            <div>
                <button id="btnLoginPassword" class="l-button-login">Ingresar</button>
                <p id="messageError" style="display: none"> Usuario/contrase\xF1a son invalidos</p>
                <p class="text-small">\xBFNo tienes cuenta?
                    <span class="text-color-orange manita" id="spnNuevaCuenta">Crea una aqu\xED</span>
                </p>
            </div>
            </form>
            
        </div>
        
        <div class="l-container-informacion">
            <p class="text-title text-color-white">Bienvenidos a:</p>
            <img src="./../../img/logo.png" alt="">
            <p class="text-color-white">Somos un espacio en donde podras consultar o publicar informaci\xF3n acerca de
                nuestros amigos de 4 patitas.
            </p>
        </div>
    </div>
</div>`,
  loadEvents: () => {
    document.getElementById("spnNuevaCuenta").addEventListener("click", () => {
      window.history.pushState({}, "", `${window.location.origin}/register`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    document.getElementById("btnLoginGoogle").addEventListener("click", async () => {
      loginWithGoogle().then(() => {
        window.history.pushState({}, "", `${window.location.origin}/feed`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }).catch(() => {
        document.getElementById("messageError").style.display = "block";
      });
    });
    document.getElementById("formLogin").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("iptEmail").value;
      const password = document.getElementById("iptPassword").value;
      loginWithPassword(email, password).then(() => {
        window.history.pushState({}, "", `${window.location.origin}/feed`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }).catch(() => {
        document.getElementById("messageError").style.display = "block";
      });
    });
    function ocultarError() {
      document.getElementById("messageError").style.display = "none";
    }
    document.getElementById("iptEmail").addEventListener("focus", ocultarError);
    document.getElementById("iptPassword").addEventListener("focus", ocultarError);
  }
};
export {
  login as l
};
