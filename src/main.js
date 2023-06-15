import { routes } from './routes.js';

// Funcion para navegar entre componentes
export const navigation = async (path) => {
  const root = document.getElementById('app');
  // Buscamos que  componente corresponde a la ruta en el objeto routes
  const component = routes[path];
  // Cargamos el HTML
  root.innerHTML = await component.loadHTML();
  // Cargamos los eventos
  await component.loadEvents();
};

// Evento al cargar la pagina
window.addEventListener('load', () => {
  window.history.pushState({}, '', window.location.origin);
  navigation('/');
});

// Evento al cambiar la ruta
window.addEventListener('popstate', async () => {
  const path = window.location.pathname;
  navigation(path);
});
