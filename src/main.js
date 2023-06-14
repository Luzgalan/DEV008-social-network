import { routes } from './routes.js';

// Funcion para navegar entre componentes
export const navigation = async () => {
  const root = document.getElementById('app');
  // Obtenemos la liga actual en la barrra de url
  const path = window.location.pathname;
  // Buscamos que  componente corresponde a la ruta en el objeto routes
  const component = routes[path];
  // Solo cuando es login o register pintamos el fondo de naranja

  // Cargamos el HTML
  root.innerHTML = await component.loadHTML();
  // Cargamos los eventos
  await component.loadEvents();
};

// Evento al cargar la pagina
window.addEventListener('load', navigation);
// evento al cambiar la ruta
window.addEventListener('hasChange', navigation);
