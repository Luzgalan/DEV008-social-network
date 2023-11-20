/* import { async } from 'regenerator-runtime'; */
import abeja from '../../imgfeed/abejita.png';
import perrito from '../../imgfeed/perritove.png';
import logocorto from '../../imgfeed/logo-corto.png';

import {
  newPost, logoutSesion, deletePost, subscribeToDataChanges, updatePost, getDataUser,
  updatePostLike,
} from './feed.controller';

// Objeto feed, se cargan los elementos del HTML.
const feed = {
  loadHTML: () => `<main id="pageAllContent">
  <header id="feedHeader">
      <div id="feedLogoContent">
          <img id="feedLogo" src="${logocorto}" alt="Logotype">
      </div>
      <span class="material-symbols-outlined" id="logoutfeed">move_item</span>
  </header>
  <section id="feedAllContent">
      <aside id="feedAside">
          <div id="feedMenu"><span class="material-symbols-menu">
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
              <div class="randomAbeja"><img id="randomAbeja" src="${abeja}" alt="Abejita"></div>
              <div class="randomDog"><img id="randomDog" src="${perrito}" alt="Perrito"></div>
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

  loadEvents: () => {
    // Vamos por los datos del usuario cuando carga el feed
    getDataUser().then((usuario) => {
      /* Mostrar la imagen y nombre */
      // Guardar clave, valor en nuestro localstorage
      localStorage.setItem('username', usuario.name);
      document.getElementById('feedNameProfile').textContent = usuario.name;
      document.getElementById('feedProfileImage').src = usuario.photoUrl;
    });
    // Al terminar de escribirse el nuevo post, se limpia el input de entrada.
    const clearInput = () => {
      document.getElementById('feedNewPost').value = '';
    };
    // Se cierra la sesión del usuario
    const logout = document.getElementById('logoutfeed');
    logout.addEventListener('click', () => {
      try {
        logoutSesion(); // Caducar token
        // Eliminar token
        localStorage.clear();
        // Remueve todos los elementos en localStorage.
        // Redireccionamiento del usuario al login
        window.history.pushState({}, '', `${window.location.origin}/`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (error) {
        alert.error('Error during logout:', error);
      }
    });
    // Función que nos ayuda a crear cada nuevo post, con sus propios elementos.
    const renderNewElement = (data) => {
      const feedContainer = document.getElementById('feedScrollContent');
      const newDiv = document.createElement('div');
      newDiv.id = 'newPostFeed';
      const textPostArea = document.createElement('textarea');
      textPostArea.textContent = data.publicacion.publicacion;
      /*  console.log(textPostArea.textContent); */
      textPostArea.id = `ta${data.id}`;
      // Está deshabilitado hasta que el usuario le de click al ícono editar.
      textPostArea.disabled = true;

      // Traemos la fecha de creación y la mostramos en cada post.
      const datePost = document.createElement('p');
      const setDate = new Date(data.publicacion.createdAt);
      /* console.log(setDate); */
      const formatoDate = `${setDate.getDate()}/${setDate.getMonth() + 1}/${setDate.getFullYear()}`;
      datePost.textContent = formatoDate;
      // Traemos el nombre del ususario creador de cada post y lo mostramos en cada post.
      const fotoNombrePost = document.createElement('span');
      fotoNombrePost.textContent = data.publicacion.author ? data.publicacion.author : 'Usuario Pet Lover';
      // Section contenedora para mostrar los iconos
      const likeEditDeleteDiv = document.createElement('section');
      likeEditDeleteDiv.id = 'likeEditDelete';
      // Likes

      const contenedorLikes = document.createElement('section');
      contenedorLikes.id = 'contenedorLikes';

      const spanLike = document.createElement('span');
      spanLike.className = 'material-symbols-like';
      spanLike.textContent = 'favorite';
      spanLike.id = `li${data.id}`;
      spanLike.value = data;
      // Contador de Likes
      const spanCount = document.createElement('span');
      spanCount.className = 'material-symbols-count';
      spanCount.id = `count${data.id}`;
      spanCount.textContent = data.publicacion.likes.length;

      contenedorLikes.appendChild(spanLike);
      contenedorLikes.appendChild(spanCount);
      // Editar post
      const spanEdit = document.createElement('span');
      spanEdit.className = 'material-symbols-edit';
      spanEdit.textContent = 'edit_square';
      spanEdit.id = `ed${data.id}`;
      spanEdit.value = data.id;
      // Eliminar post
      const spanDelete = document.createElement('span');
      spanDelete.className = 'material-symbols-delete';
      spanDelete.setAttribute('data-id', data.id);
      spanDelete.textContent = 'delete';
      spanDelete.id = `de${data.id}`;
      spanDelete.value = data.id;
      // Guardar cambios de Editar
      const spanSave = document.createElement('span');
      spanSave.className = 'material-symbols-save';
      spanSave.textContent = 'save';
      spanSave.id = `sa${data.id}`;
      spanSave.value = data.id;
      spanSave.style.display = 'none';
      // Cancelar cambios de post
      const spanCancel = document.createElement('span');
      spanCancel.className = 'material-symbols-cancel';
      spanCancel.textContent = 'cancel';
      spanCancel.id = `ca${data.id}`;
      spanCancel.value = data.id;
      spanCancel.style.display = 'none';
      // Mostramos los nodos hijos de cada nodo padre
      likeEditDeleteDiv.appendChild(spanLike);
      likeEditDeleteDiv.appendChild(spanCount);

      /* - Verficamos si el autor de la publicacion es el mismo del Local Storage - */
      if (data.publicacion.author === localStorage.getItem('username')) {
        likeEditDeleteDiv.appendChild(spanEdit);
        likeEditDeleteDiv.appendChild(spanDelete);
      }
      likeEditDeleteDiv.appendChild(contenedorLikes);
      // Mostramos los nodos hijos de cada nodo padre
      likeEditDeleteDiv.appendChild(spanSave);
      likeEditDeleteDiv.appendChild(spanCancel);

      newDiv.appendChild(fotoNombrePost);
      newDiv.appendChild(textPostArea);
      newDiv.appendChild(likeEditDeleteDiv);

      fotoNombrePost.appendChild(datePost);
      // Manipulamos la forma en que se muestran
      feedContainer.insertBefore(newDiv, feedContainer.firstChild);

      // Traemos la función que nos permite mostrar la longitud del arreglo = likes
      const spanWithLikes = document.getElementById(`li${data.id}`);
      spanWithLikes.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que la página se recargue
        const likesActuales = event.target.value.publicacion.likes;
        const arrayEmail = localStorage.email;
        const hasLike = likesActuales.includes(arrayEmail);

        // Utilizamos métodos de remove y union en Firebase. Importamos updatePostLike.
        if (hasLike) {
          updatePostLike(event.target.value.id, 'remove');
        } else {
          updatePostLike(event.target.value.id, 'union');
        }

        // Aplicar el toggle para agregar/quitar la clase .liked
        spanWithLikes.classList.toggle('liked');
      });
      // Funciones que nos permiten modificar el contenido del post, guardar y cancelar, mostrar y
      // no mostrar elementos de iconos.
      spanEdit.addEventListener('click', (e) => {
        const editId = e.target.value;
        const textModificado = document.getElementById(`ta${editId}`);
        // Guardamos temporalmente el origina en el local storage
        localStorage.setItem('publicacionOriginal', textModificado.value);

        textModificado.disabled = false;
        textModificado.focus(); // activo para recibir interacciones del usuario
        // establecer la selección de texto dentro de un elemento
        textModificado.setSelectionRange(textModificado.value.length, textModificado.value.length);
        document.getElementById(`ed${editId}`).style.display = 'none';
        //  k document.getElementById(`li${editId}`).style.display = 'none';
        document.getElementById(`de${editId}`).style.display = 'none';
        document.getElementById(`sa${editId}`).style.display = 'flex';
        document.getElementById(`ca${editId}`).style.display = 'flex';
      });

      spanCancel.addEventListener('click', (e) => {
        const editId = e.target.value;
        textPostArea.disabled = true;
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
      // Funciones para Eliminar post.
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
          /*  console.log(traerModal); */
        });
        // Eliminar post al dar click en aceptarEliminarBtn
        const aceptarEliminarBtn = document.getElementById('aceptarEliminar');
        aceptarEliminarBtn.setAttribute('data-id', data.id);
        aceptarEliminarBtn.addEventListener('click', (event) => {
          const traerModal = document.getElementById('modalEliminar');
          traerModal.parentNode.removeChild(traerModal);
          const docId = event.currentTarget.getAttribute('data-id');
          // Se manda llamar función de eliminar post de Firebase
          deletePost(docId);
        });
      });
    };
    // Debo de imprimir en consola el id del doc que debo correr al hacer click
    document.getElementById('publish').addEventListener('click', async () => {
      const obtenerRelleno = document.getElementById('feedNewPost').value;
      // El valor del input debe ser distinto a vacío
      if (obtenerRelleno.length !== 0) {
        await newPost({ publicacion: obtenerRelleno });
        clearInput(); // Limpia el contenido del campo de entrada
      }
    });
    // Click en botón cancel del input de Nuevo post, se manda a llamar función clearInput.
    document.getElementById('cancel').addEventListener('click', () => {
      clearInput();
    });
    // Función que nos permite mandar a llamar actualizarFeed y ejecuta función de crear nuevo
    // post con todos sus elementos hijos.
    const actualizarFeed = (data) => {
      const feedContainer = document.getElementById('feedScrollContent');
      feedContainer.innerHTML = '';
      data.forEach((item) => {
        const postElement = renderNewElement({ publicacion: item, id: item.id });
        // Verificar si el post tiene un "Me gusta" en el localStorage
        if (localStorage.getItem(`like_${item.id}`) === 'true') {
          postElement.querySelector('.material-symbols-like').classList.add('liked');
        }
      });
    };
    subscribeToDataChanges(actualizarFeed);
  },
};

export default feed;
