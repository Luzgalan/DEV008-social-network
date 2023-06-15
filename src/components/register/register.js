import { crearUsuario } from './register.controller';

const register = {
  loadHTML: async () => {
    const templateHTML = await fetch('components/register/register.html');
    return templateHTML.text();
  },
  loadEvents: async () => {
    document.getElementById('Crearcuenta').addEventListener('click', async () => {
      document.getElementById('Crearcuenta').disabled = true;
      await crearUsuario({ nombre: 'Karen', email: 'love@gmail.com', edad: '18' });
    });
  },
};

export default register;
