import { newPost, getData } from './feed.controller';

const feed = {
  loadHTML: () => `<main id="pageAllContent">
  <header id="feedHeader">
      <div id="feedLogoContent">
          <img id="feedLogo" src="imgfeed/logo-eslogan.png" alt="Logotype">
      </div>
      <nav id="feedGeneralSearch">
          <input type="text" id="inputSearch" placeholder="Buscar">
          <div id="searchContent"><span class="material-symbols-search">search</span></div>
      </nav>
      <span class="material-symbols-outlined">move_item</span>
  </header>
  <section id="feedAllContent">
      <aside id="feedAside">
          <div id="feedMenu"><span class="material-symbols-menu">
                  menu
              </span>
              <select class="menuSelects">
                  <option value="opcion1">Perfil</option>
                  <option value="opcion2">Risoterapia</option>
                  <option value="opcion3">Adopciones</option>
                  <option value="opcion4">Servicios</option>
                  <option value="opcion5">Pet S.O.S</option>
                  <option value="opcion6">Configuración</option>
              </select>
          </div>
          <section id="feedProfile">
              <div id="feedProfileImageContent"><img id="feedProfileImage" src="imgfeed/perfilFoto.jpg"
                      alt="Foto de perfil"></div>
              <h2 id="feedNameProfile">Liliana Vega</h2>
              <h3 id="feedWelcome">¡Bienvenid@!</h3>
              <p id="feedIntroduction">En <span class="feedNameLogo">Pet Lovers...</span>
                  puedes encontrar el contenido que necesitas, visita nuestras categorías donde podrás buscar o
                  encontrar a tu
                  mascota
                  perdida, reírte de los reyes del hogar o encontrar u ofrecer servicios relacionados.
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
                  <select id="feedcategory">
                      <option value="" disabled selected>Categorías</option>
                      <option value="risoterapia" id="risoterapia">Risoterapia</option>
                      <option value="adopciones" id="adopciones">Adopciones</option>
                      <option value="servicios" id="servicios">Servicios</option>
                      <option value="petSos" id="petSos">Pet S.O.S</option>
                  </select>
                  <button id="publish" type="submit">Publicar</button>
                  <button id="cancel" type="submit">Cancelar</button>
              </div>
          </section>
          <div id="feedScrollContent"></div>
      </section>
</main>`,

  loadEvents: async () => {
    const clearInput = () => {
      document.getElementById('feedNewPost').value = '';
    };

    const renderNewElement = (data) => {
      const feedContainer = document.getElementById('feedScrollContent');
      const newDiv = document.createElement('div');
      const parrafo = document.createElement('p');
      parrafo.textContent = data.publicacion;

      const likeEditDeleteDiv = document.createElement('div');
      likeEditDeleteDiv.id = 'likeEditDelete';
      const spanLike = document.createElement('span');
      spanLike.className = 'material-symbols-like';
      spanLike.textContent = 'favorite';
      const spanEdit = document.createElement('span');
      spanEdit.className = 'material-symbols-edit';
      spanEdit.textContent = 'edit_square';
      const spanDelete = document.createElement('span');
      spanDelete.className = 'material-symbols-delete';
      spanDelete.textContent = 'delete';

      likeEditDeleteDiv.appendChild(spanLike);
      likeEditDeleteDiv.appendChild(spanEdit);
      likeEditDeleteDiv.appendChild(spanDelete);

      parrafo.appendChild(likeEditDeleteDiv);

      newDiv.appendChild(parrafo);

      feedContainer.insertBefore(newDiv, feedContainer.firstChild);
    };

    document.getElementById('publish').addEventListener('click', async () => {
      const obtenerRelleno = document.getElementById('feedNewPost').value;
      if (obtenerRelleno.length !== 0) {
        await newPost({ publicacion: obtenerRelleno });
        console.log(obtenerRelleno);
        renderNewElement({ publicacion: obtenerRelleno }); // Agrega el nuevo elemento al principio
        clearInput(); // Limpia el contenido del campo de entrada
      }
    });

    const publicaciones = await getData();
    const publicacionesReversas = publicaciones.docs.reverse();
    // Invierte el orden del array de publicaciones
    publicacionesReversas.forEach((item) => {
      renderNewElement({ publicacion: item.data().publicacion });
    });

    // Escucha los cambios en tiempo real de Firebase
    getData().onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        if (change.type === 'added') {
          renderNewElement({ publicacion: data.publicacion });
        }
      });
    });
  },
};

export default feed;
