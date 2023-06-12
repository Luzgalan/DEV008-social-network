const login = {
  loadHTML: async () => {
    const templateHTML = await fetch('components/login/login.html');
    return templateHTML.text();
  },
  loadEvents: async () => {
    document.getElementById('btnPrueba').addEventListener('click', () => {
      console.log('Me clickean');
    });
  },
};

export default login;
