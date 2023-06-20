const feed = {
  loadHTML: async () => {
    const templateHTML = await fetch('components/feed/feed.html');
    return templateHTML.text();
  },
  loadEvents: async () => {

  },
};

export default feed;
// sin cambios
