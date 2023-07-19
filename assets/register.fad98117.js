import { g as getAuth, P as Ph, a as app, f as createUserWithEmailAndPassword, p as pf, _ as _h } from "./firebase.4377bee5.js";
import { l as loginWithGoogle } from "./login.controller.1f2674a3.js";
const auth = getAuth();
const db = Ph(app);
const docRef1 = (nombre, email) => {
  pf(_h(db, "usuarioPrueba"), {
    name: nombre,
    email,
    photoUrl: "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
  });
};
const signInUser = (nombre, email, password) => {
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    docRef1(nombre, email);
    const user = userCredential.user;
    window.history.pushState({}, "", `${window.location.origin}/`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      document.getElementById("repeat-email").style.display = "block";
    } else if (errorCode === "auth/weak-password") {
      document.getElementById("6-letters").style.display = "block";
    } else {
      document.getElementById("7-letter").style.display = "block";
    }
  });
};
const register = {
  loadHTML: () => `<section>
    <div class="contenedor-crear-cuenta">
        <div class="logo-cuenta">
            <p class="text-title text-color-white" id="bienvenido">Bienvenidos a:</p>
            <img src="../../img/logo.png" class="marca">
            <p class="text-color-white">Somos un espacio en donde podr\xE1s consultar o publicar informaci\xF3n acerca de
                nuestros amigos de 4
                patitas.
            </p>
        </div>
  
        <form class="formulario-cuenta" id="formCrearcuenta">
            <h1 class="text-title">Crear cuenta</h1>
            <img class="imgResponsive" src="./../../img/logo.png" >
            <input type="text" placeholder="Nombre" required id="nombre" class="ingresa"> 
            <input type="email" placeholder="Correo electr\xF3nico" required id="correo" class="ingresa"> 
            <input type="password" placeholder="Contrase\xF1a" required id="contrasena" class="ingresa"> 
            <input type="password" placeholder="Confirmar contrase\xF1a" required id="confirmar-contrasena"
                class="ingresa"> 
            <button type=""submit id="Crearcuenta">Crear cuenta</button>
            <div id="distintas-contrasenas"> </div>
            <p id="repeat-password" style="display: none"> Las contrase\xF1as no coinciden </p>
            <p id="repeat-email" style="display: none"> El correo se encuentra registrado </p>
            <p id="6-letters" style="display: none"> La contrase\xF1a debe contener al menos 6 caracteres </p> 
            <p id="7-letters" style="display: none"> Correo o contrase\xF1a inv\xE1lidos </p> 
            
            <p class="text-small">\xBFYa tienes una cuenta registrada?
                    <span class="text-color-orange manita" id="spnRegistro">Ingresa aqu\xED</span>
                </p>
              
            <h3 class="text-small"> O ingresa con tu cuenta de Google</h3>
            <div id="btnLoginGoogle">
                <img width="40" height="40" viewBox="0 0 64 64" src="https://cdn-icons-png.flaticon.com/512/300/300221.png">
                    
                
            </div>  
        </form>
  
    </div>
  </section>`,
  loadEvents: () => {
    document.getElementById("formCrearcuenta").addEventListener("submit", (event) => {
      event.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("correo").value;
      const contrasena = document.getElementById("contrasena").value;
      const confirmarContrasena = document.getElementById("confirmar-contrasena").value;
      if (contrasena === confirmarContrasena) {
        signInUser(nombre, email, contrasena);
      } else {
        document.getElementById("repeat-password").style.display = "block";
      }
    });
    document.getElementById("spnRegistro").addEventListener("click", () => {
      window.history.pushState({}, "", `${window.location.origin}/`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    document.getElementById("btnLoginGoogle").addEventListener("click", async () => {
      document.getElementById("btnLoginGoogle").disabled = true;
      loginWithGoogle().then(() => {
        window.history.pushState({}, "", `${window.location.origin}/feed`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }).catch(() => {
        document.getElementById("messageError").style.display = "block";
      });
    });
    function ocultarError() {
      document.getElementById("repeat-password").style.display = "none";
      document.getElementById("repeat-email").style.display = "none";
      document.getElementById("6-letters").style.display = "none";
      document.getElementById("7-letters").style.display = "none";
    }
    document.getElementById("correo").addEventListener("focus", ocultarError);
    document.getElementById("contrasena").addEventListener("focus", ocultarError);
    document.getElementById("confirmar-contrasena").addEventListener("focus", ocultarError);
    document.getElementById("nombre").addEventListener("focus", ocultarError);
  }
};
export {
  register as r
};
