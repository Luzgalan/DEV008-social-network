const login = {
  loadHTML: async () => {
    const templateHTML = await fetch('components/login/login.html');
    return templateHTML.text();
  },
  loadEvents: async () => {

  },
};

export default login;
