import { routes } from './routes.js';

// Funcion para navegar entre componentes
export const navigation = (path) => {
  const root = document.getElementById('app');
  // Buscamos que  componente corresponde a la ruta en el objeto routes
  const component = routes[path];
  // Cargamos el HTML
  root.innerHTML = component.loadHTML();
  // Cargamos los eventos
  component.loadEvents();
};

// Evento al cargar la pagina
window.addEventListener('load', () => {
  let path = window.location.pathname;
  const token = localStorage.getItem('accessToken');

  if (path === '/' || path === '/register') {
    // Para ir al login o register no debe haber token
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
