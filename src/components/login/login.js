import { loginWithGoogle } from './login.controller';

const login = {
  loadHTML: async () => {
    const templateHTML = await fetch('components/login/login.html');
    return templateHTML.text();
  },
  loadEvents: async () => {
    /* -------------------------- Navegacion a register ------------------------- */
    document.getElementById('spnNuevaCuenta').addEventListener('click', () => {
      window.history.pushState({}, '', `${window.location.origin}/register`);
      /* ----- Dispara manualmente el evento popstate para actualizar la ruta ----- */
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    /* ----------------------------- Inniciar sesion con google---------------------------- */
    document.getElementById('btnLoginGoogle').addEventListener('click', async () => {
      document.getElementById('btnLoginGoogle').disabled = true;
      // await createUser('luz', 'vg@outlook.es', 'photo');
      await loginWithGoogle();
    });
  },
};

export default login;
