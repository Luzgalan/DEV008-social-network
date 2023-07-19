import { g as getAuth, P as Ph, a as app, p as pf, _ as _h, I as If, R as Rl, x as xl, s as signOut, b as bl, d as df, y as yf, c as gh, e as gf, Q as Qf, j as jf } from "./firebase.4377bee5.js";
const auth = getAuth();
const db = Ph(app);
const newPost = async ({ publicacion }) => {
  try {
    const docRef = await pf(_h(db, "nuevoPost"), {
      publicacion,
      createdAt: Date.now(),
      author: localStorage.getItem("username"),
      likes: []
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const subscribeToDataChanges = (actualizarFeed) => {
  return If(Rl(_h(db, "nuevoPost"), xl("createdAt", "asc")), (snapshot) => {
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    actualizarFeed(data);
  });
};
const logoutSesion = async () => {
  try {
    const result = await signOut(auth);
    return result;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Error during logout:");
  }
};
const deletePost = async (docId) => {
  try {
    await yf(gh(db, "nuevoPost", docId));
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};
const updatePost = async (saveId, publicacion) => {
  return gf(gh(db, "nuevoPost", saveId), {
    publicacion
  });
};
const updatePostLike = (id, tipo) => {
  const email = localStorage.getItem("email");
  if (tipo === "union") {
    return gf(gh(db, "nuevoPost", id), {
      likes: Qf(email)
    });
  }
  return gf(gh(db, "nuevoPost", id), {
    likes: jf(email)
  });
};
const getDataUser = () => {
  const q = Rl(_h(db, "usuarioPrueba"), bl("email", "==", localStorage.getItem("email")));
  return df(q).then((querySnapshot) => {
    return querySnapshot.docs[0].data();
  }).catch((error) => {
    throw error;
  });
};
const feed = {
  loadHTML: () => `<main id="pageAllContent">
  <header id="feedHeader">
      <div id="feedLogoContent">
          <img id="feedLogo" src="imgfeed/logo-corto.png" alt="Logotype">
      </div>
      <span class="material-symbols-outlined" id="logoutfeed">move_item</span>
  </header>
  <section id="feedAllContent">
      <aside id="feedAside">
          <div id="feedMenu"><span class="material-symbols-menu">
                  menu
              </span>
          </div>
          <section id="feedProfile">
              <div id="feedProfileImageContent"><img id="feedProfileImage" src="imgfeed/perfilFoto.jpg"
                      alt="Foto de perfil"></div>
              <h2 id="feedNameProfile">Liliana Vega</h2>
              <h3 id="feedWelcome">\xA1Bienvenid@!</h3>
              <p id="feedIntroduction">En <span class="feedNameLogo">Pet Lovers...</span>
                  encuentra a tu
                  mascota
                  perdida, r\xEDete de los reyes del hogar u ofrece servicios relacionados.
              </p>
          </section>
      </aside>
      <section id="feedScroll">
          <div id="randomImages">
              <p id="adoptionLetter">Y si adoptas un nuevo mejor amigo? Por fis...</p>
              <div class="randomAbeja"><img id="randomAbeja" src="imgfeed/abejita.png" alt="Abejita"></div>
              <div class="randomDog"><img id="randomDog" src="imgfeed/perritove.png" alt="Perrito"></div>
          </div>
          <section id="newPost">
              <h4 class="newPost">Crear nueva publicaci\xF3n</h4>
              <input type="text" id="feedNewPost" placeholder="Cu\xE9ntanos,  \xBFQu\xE9 quieres compartir?...">
              <div class="botones">
                  <button id="publish" type="submit">Publicar</button>
                  <button id="cancel" type="submit">Cancelar</button>
              </div>
          </section>
          <div id="feedScrollContent"></div>
      </section>
</main>`,
  loadEvents: () => {
    getDataUser().then((usuario) => {
      localStorage.setItem("username", usuario.name);
      document.getElementById("feedNameProfile").textContent = usuario.name;
      document.getElementById("feedProfileImage").src = usuario.photoUrl;
    });
    const clearInput = () => {
      document.getElementById("feedNewPost").value = "";
    };
    const logout = document.getElementById("logoutfeed");
    logout.addEventListener("click", () => {
      try {
        logoutSesion();
        localStorage.clear();
        window.history.pushState({}, "", `${window.location.origin}/`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      } catch (error) {
        alert.error("Error during logout:", error);
      }
    });
    const renderNewElement = (data) => {
      const feedContainer = document.getElementById("feedScrollContent");
      const newDiv = document.createElement("div");
      newDiv.id = "newPostFeed";
      const textPostArea = document.createElement("textarea");
      textPostArea.textContent = data.publicacion.publicacion;
      textPostArea.id = `ta${data.id}`;
      textPostArea.disabled = true;
      const datePost = document.createElement("p");
      const setDate = new Date(data.publicacion.createdAt);
      const formatoDate = `${setDate.getDate()}/${setDate.getMonth() + 1}/${setDate.getFullYear()}`;
      datePost.textContent = formatoDate;
      const fotoNombrePost = document.createElement("span");
      fotoNombrePost.textContent = data.publicacion.author ? data.publicacion.author : "Usuario Pet Lover";
      const likeEditDeleteDiv = document.createElement("section");
      likeEditDeleteDiv.id = "likeEditDelete";
      const contenedorLikes = document.createElement("section");
      const spanLike = document.createElement("span");
      spanLike.className = "material-symbols-like";
      spanLike.textContent = "favorite";
      spanLike.id = `li${data.id}`;
      spanLike.value = data;
      const spanCount = document.createElement("span");
      spanCount.className = "material-symbols-count";
      spanCount.id = `count${data.id}`;
      spanCount.textContent = data.publicacion.likes.length;
      contenedorLikes.appendChild(spanLike);
      contenedorLikes.appendChild(spanCount);
      const spanEdit = document.createElement("span");
      spanEdit.className = "material-symbols-edit";
      spanEdit.textContent = "edit_square";
      spanEdit.id = `ed${data.id}`;
      spanEdit.value = data.id;
      const spanDelete = document.createElement("span");
      spanDelete.className = "material-symbols-delete";
      spanDelete.setAttribute("data-id", data.id);
      spanDelete.textContent = "delete";
      spanDelete.id = `de${data.id}`;
      spanDelete.value = data.id;
      const spanSave = document.createElement("span");
      spanSave.className = "material-symbols-save";
      spanSave.textContent = "save";
      spanSave.id = `sa${data.id}`;
      spanSave.value = data.id;
      spanSave.style.display = "none";
      const spanCancel = document.createElement("span");
      spanCancel.className = "material-symbols-cancel";
      spanCancel.textContent = "cancel";
      spanCancel.id = `ca${data.id}`;
      spanCancel.value = data.id;
      spanCancel.style.display = "none";
      likeEditDeleteDiv.appendChild(contenedorLikes);
      if (data.publicacion.author === localStorage.getItem("username")) {
        likeEditDeleteDiv.appendChild(spanEdit);
        likeEditDeleteDiv.appendChild(spanDelete);
      }
      likeEditDeleteDiv.appendChild(spanSave);
      likeEditDeleteDiv.appendChild(spanCancel);
      newDiv.appendChild(fotoNombrePost);
      newDiv.appendChild(textPostArea);
      newDiv.appendChild(likeEditDeleteDiv);
      fotoNombrePost.appendChild(datePost);
      feedContainer.insertBefore(newDiv, feedContainer.firstChild);
      const spanWithLikes = document.getElementById(`li${data.id}`);
      spanWithLikes.addEventListener("click", (event) => {
        const likesActuales = event.target.value.publicacion.likes;
        const arrayEmail = localStorage.email;
        const hasLike = likesActuales.includes(arrayEmail);
        if (hasLike) {
          updatePostLike(event.target.value.id, "remove");
        } else {
          updatePostLike(event.target.value.id, "union");
        }
      });
      spanEdit.addEventListener("click", (e) => {
        const editId = e.target.value;
        const textModificado = document.getElementById(`ta${editId}`);
        localStorage.setItem("publicacionOriginal", textModificado.value);
        textModificado.disabled = false;
        textModificado.focus();
        textModificado.setSelectionRange(textModificado.value.length, textModificado.value.length);
        document.getElementById(`ed${editId}`).style.display = "none";
        document.getElementById(`de${editId}`).style.display = "none";
        document.getElementById(`sa${editId}`).style.display = "flex";
        document.getElementById(`ca${editId}`).style.display = "flex";
      });
      spanCancel.addEventListener("click", (e) => {
        const editId = e.target.value;
        textPostArea.disabled = true;
        document.getElementById(`ed${editId}`).style.display = "flex";
        document.getElementById(`li${editId}`).style.display = "flex";
        document.getElementById(`de${editId}`).style.display = "flex";
        document.getElementById(`sa${editId}`).style.display = "none";
        document.getElementById(`ca${editId}`).style.display = "none";
        document.getElementById(`ta${editId}`).value = localStorage.getItem("publicacionOriginal");
        localStorage.removeItem("publicacionOriginal");
      });
      spanSave.addEventListener("click", (e) => {
        const saveId = e.target.value;
        const textAreaModificado = document.getElementById(`ta${data.id}`);
        const publicacionMod = textAreaModificado.value.trim();
        updatePost(saveId, publicacionMod);
      });
      spanDelete.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.id = "modalEliminar";
        modal.innerHTML = `
          <h3>\xBFEn serio quieres eliminar tu publicaci\xF3n?</h3>
          <button id="cancelarEliminar" type="button">Cancelar</button>
          <button id="aceptarEliminar" type="button">Aceptar</button>
        `;
        document.body.appendChild(modal);
        modal.style.display = "block";
        const cancelarEliminarBtn = document.getElementById("cancelarEliminar");
        cancelarEliminarBtn.addEventListener("click", () => {
          const traerModal = document.getElementById("modalEliminar");
          traerModal.parentNode.removeChild(traerModal);
        });
        const aceptarEliminarBtn = document.getElementById("aceptarEliminar");
        aceptarEliminarBtn.setAttribute("data-id", data.id);
        aceptarEliminarBtn.addEventListener("click", (event) => {
          const traerModal = document.getElementById("modalEliminar");
          traerModal.parentNode.removeChild(traerModal);
          const docId = event.currentTarget.getAttribute("data-id");
          deletePost(docId);
        });
      });
    };
    document.getElementById("publish").addEventListener("click", async () => {
      const obtenerRelleno = document.getElementById("feedNewPost").value;
      if (obtenerRelleno.length !== 0) {
        await newPost({ publicacion: obtenerRelleno });
        clearInput();
      }
    });
    document.getElementById("cancel").addEventListener("click", () => {
      clearInput();
    });
    const actualizarFeed = (data) => {
      const feedContainer = document.getElementById("feedScrollContent");
      feedContainer.innerHTML = "";
      data.forEach((item) => {
        renderNewElement({ publicacion: item, id: item.id });
      });
    };
    subscribeToDataChanges(actualizarFeed);
  }
};
export {
  feed as f
};
