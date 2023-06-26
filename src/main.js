import { routes } from './routes.js';

// Funcion para navegar entre componentes
export const navigation = async (path) => {
  const root = document.getElementById('app');
  // Buscamos que  componente corresponde a la ruta en el objeto routes
  const component = routes[path];
  // Cargamos el HTML

  root.innerHTML = component.loadHTML();
  // Cargamos los eventos
  await component.loadEvents();
};

// Evento al cargar la pagina
window.addEventListener('load', () => {
<<<<<<< HEAD
  const path = window.location.pathname; // Toma la ultima parte del url, el pathname es register
=======
  let path = window.location.pathname;
  const token = localStorage.getItem('accessToken');

  if (path === '/' || path === '/register') {
    if (token !== null) {
      // crear una funcion para validar el token desde auth
      // firebase(ya existe un metodo para validar el token)
      path = '/feed';
      window.location.pathname = path;
    }
  } else if (path === '/feed') {
    if (token === null) {
      path = '/';
      window.location.pathname = path;
    }
  }
>>>>>>> develop
  navigation(path);
});

// Evento al cambiar la ruta
window.addEventListener('popstate', () => {
  let path = window.location.pathname;
  const token = localStorage.getItem('accessToken');

  if (path === '/' || path === '/register') {
    if (token !== null) {
      path = '/feed';
      window.location.pathname = path;
    }
  } else if (path === '/feed') {
    if (token === null) {
      path = '/';
      window.location.pathname = path;
    }
  }
  navigation(path);
});
