/* import { async } from 'regenerator-runtime'; */

import {
  newPost, logoutSesion, deletePost, subscribeToDataChanges, updatePost, getDataUser,
} from './feed.controller';

const feed = {
  loadHTML: () => `<main id="pageAllContent">
  <header id="feedHeader">
      <div id="feedLogoContent">
          <img id="feedLogo" src="imgfeed/logo-eslogan.png" alt="Logotype">
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
            
              <h3 id="feedWelcome">¡Bienvenid@!</h3>
              <p id="feedIntroduction">En <span class="feedNameLogo">Pet Lovers...</span>
                  encuentra a tu
                  mascota
                  perdida, ríete de los reyes del hogar u ofrece servicios relacionados.
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
              <h4 class="newPost">Crear nueva publicación</h4>
              <input type="text" id="feedNewPost" placeholder="Cuéntanos,  ¿Qué quieres compartir?...">
              <div class="botones">
                  <button id="publish" type="submit">Publicar</button>
                  <button id="cancel" type="submit">Cancelar</button>
              </div>
          </section>
          <div id="feedScrollContent"></div>
      </section>
</main>`,

  loadEvents: async () => {
    // Vamos por los datos del usuario cuando carga el feed
    getDataUser().then((usuario) => {
      console.log('Usuario logueado', usuario);
      localStorage.setItem('username', usuario.name);
      document.getElementById('feedNameProfile').textContent = usuario.name;
      document.getElementById('feedProfileImage').src = usuario.photoUrl;
    });

    const clearInput = () => {
      document.getElementById('feedNewPost').value = '';
    };

    const logout = document.getElementById('logoutfeed');
    logout.addEventListener('click', () => {
      try {
        logoutSesion(); // Caducar token
        // Eliminar token
        localStorage.removeItem('accessToken'); // Cambiar por : localStorage.clear()
        //* / Redireccionamiento del usuario al login
        window.history.pushState({}, '', `${window.location.origin}/`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (error) {
        console.error('Error during logout:', error);
      }
    });

    const renderNewElement = (data) => {
      const feedContainer = document.getElementById('feedScrollContent');
      const newDiv = document.createElement('div');
      const textAreaPub = document.createElement('textarea');
      textAreaPub.textContent = data.publicacion.publicacion;
      textAreaPub.id = `ta${data.id}`;
      // Está deshabilitado hasta que el usuario le de click al ícono editar.
      textAreaPub.disabled = true;

      /*   const datePost = document.createElement('p');
      datePost.textContent = 'fecha';
      datePost.id = `date${data.id}`;
      datePost.value = data.id; */

      const datePost = document.createElement('p');
      const setDate = new Date();
      const formatoDate = `Fecha de creación ${setDate.getDate()}/${setDate.getMonth() + 1}/${setDate.getFullYear()}`;
      datePost.textContent = formatoDate;

      const likeEditDeleteDiv = document.createElement('section');
      likeEditDeleteDiv.id = 'likeEditDelete';
      const spanLike = document.createElement('span');
      spanLike.className = 'material-symbols-like';
      spanLike.textContent = 'favorite';
      spanLike.id = `li${data.id}`;
      spanLike.value = data.id;

      const spanEdit = document.createElement('span');
      spanEdit.className = 'material-symbols-edit';
      spanEdit.textContent = 'edit_square';
      spanEdit.id = `ed${data.id}`;
      spanEdit.value = data.id;

      const spanDelete = document.createElement('span');
      spanDelete.className = 'material-symbols-delete';
      spanDelete.setAttribute('data-id', data.id);
      spanDelete.textContent = 'delete';
      spanDelete.id = `de${data.id}`;
      spanDelete.value = data.id;

      const spanSave = document.createElement('span');
      spanSave.className = 'material-symbols-save';
      spanSave.textContent = 'save';
      spanSave.id = `sa${data.id}`;
      spanSave.value = data.id;
      spanSave.style.display = 'none';

      const spanCancel = document.createElement('span');
      spanCancel.className = 'material-symbols-cancel';
      spanCancel.textContent = 'cancel';
      spanCancel.id = `ca${data.id}`;
      spanCancel.value = data.id;
      spanCancel.style.display = 'none';

      likeEditDeleteDiv.appendChild(spanLike);
      /* - Verficamos si el autor de la publicacion es el mismo del Local Storage - */
      if (data.publicacion.author === localStorage.getItem('username')) {
        likeEditDeleteDiv.appendChild(spanEdit);
        likeEditDeleteDiv.appendChild(spanDelete);
      }

      likeEditDeleteDiv.appendChild(spanSave);
      likeEditDeleteDiv.appendChild(spanCancel);

      newDiv.appendChild(datePost);
      newDiv.appendChild(textAreaPub);
      newDiv.appendChild(likeEditDeleteDiv);

      feedContainer.insertBefore(newDiv, feedContainer.firstChild);

      spanEdit.addEventListener('click', (e) => {
        const editId = e.target.value;
        const textModificado = document.getElementById(`ta${editId}`);
        // Guardamos temporalmente el origina en el local storage
        localStorage.setItem('publicacionOriginal', textModificado.value);

        textModificado.disabled = false;
        textModificado.focus();
        textModificado.setSelectionRange(textModificado.value.length, textModificado.value.length);
        document.getElementById(`ed${editId}`).style.display = 'none';
        document.getElementById(`li${editId}`).style.display = 'none';
        document.getElementById(`de${editId}`).style.display = 'none';
        document.getElementById(`sa${editId}`).style.display = 'flex';
        document.getElementById(`ca${editId}`).style.display = 'flex';
      });

      spanCancel.addEventListener('click', (e) => {
        const editId = e.target.value;
        textAreaPub.disabled = true;
        document.getElementById(`ed${editId}`).style.display = 'flex';
        document.getElementById(`li${editId}`).style.display = 'flex';
        document.getElementById(`de${editId}`).style.display = 'flex';
        document.getElementById(`sa${editId}`).style.display = 'none';
        document.getElementById(`ca${editId}`).style.display = 'none';
        // Recuperamos la publicacion original y lo asignamos al cuadro de texto
        document.getElementById(`ta${editId}`).value = localStorage.getItem('publicacionOriginal');
        // Borramos de el local storage
        localStorage.removeItem('publicacionOriginal');
      });

      spanSave.addEventListener('click', (e) => {
        const saveId = e.target.value;
        const textAreaModificado = document.getElementById(`ta${data.id}`);
        const publicacionMod = textAreaModificado.value.trim();
        // Cuando se confirma el guardado simplemente borramos
        updatePost(saveId, publicacionMod);
      });

      spanDelete.addEventListener('click', () => {
        // Crear el modal
        const modal = document.createElement('div');
        modal.id = 'modalEliminar';
        modal.innerHTML = `
          <h3>¿En serio quieres eliminar tu publicación?</h3>
          <button id="cancelarEliminar" type="button">Cancelar</button>
          <button id="aceptarEliminar" type="button">Aceptar</button>
        `;
        // Crear el HTML donde el botón de aceptar tenga el id del doc
        // Agregar el modal al documento
        document.body.appendChild(modal);

        // Mostrar el modal
        modal.style.display = 'block';

        // Cerrar el modal al hacer clic en el botón de cancelar
        const cancelarEliminarBtn = document.getElementById('cancelarEliminar');
        cancelarEliminarBtn.addEventListener('click', () => {
          const traerModal = document.getElementById('modalEliminar');
          traerModal.parentNode.removeChild(traerModal);
          console.log(traerModal);
        });

        const aceptarEliminarBtn = document.getElementById('aceptarEliminar');
        aceptarEliminarBtn.setAttribute('data-id', data.id);
        aceptarEliminarBtn.addEventListener('click', (event) => {
          const traerModal = document.getElementById('modalEliminar');
          traerModal.parentNode.removeChild(traerModal);
          const docId = event.currentTarget.getAttribute('data-id');
          console.log(docId);
          deletePost(docId);
        });
      });
    };
    // Debo de imprimir en consola el id del doc que debo correr al hacer click

    document.getElementById('publish').addEventListener('click', async () => {
      const obtenerRelleno = document.getElementById('feedNewPost').value;
      console.log(obtenerRelleno);
      if (obtenerRelleno.length !== 0) {
        await newPost({ publicacion: obtenerRelleno });
        clearInput(); // Limpia el contenido del campo de entrada
      }
    });

    document.getElementById('cancel').addEventListener('click', () => {
      clearInput();
    });

    const actualizarFeed = (data) => {
      const feedContainer = document.getElementById('feedScrollContent');
      feedContainer.innerHTML = '';
      data.forEach((item) => {
        renderNewElement({ publicacion: item, id: item.id });
      });
    };

    subscribeToDataChanges(actualizarFeed);
  },
};

export default feed;
