const register = {
  loadHTML: async () => {
    const templateHTML = await fetch('components/register/register.html');
    return templateHTML.text();
  },
  loadEvents: async () => {

  },
};

export default register;
