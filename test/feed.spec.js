/**
 * @jest-environment jsdom
 */

import feed from '../src/components/feed/feed';
import {
  newPost, subscribeToDataChanges, logoutSesion, deletePost, updatePost, updatePostLike,
  getDataUser,
} from '../src/components/feed/feed.controller';

describe('Feed test header', () => {
  test('Content of elements in header', () => {
    // Preparación
    const app = document.createElement('header');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadHTML();
    // Aserción: Comprobamos la existencia de elementos específicos
    const header = app.querySelector('#feedHeader');
    expect(header).not.toBeNull();

    const logo = app.querySelector('#feedLogo');
    expect(logo).not.toBeNull();

    const logout = app.querySelector('#logoutfeed');
    expect(logout).not.toBeNull();
  });
});

describe('Feed test section feedAllContent', () => {
  test('Content of elements in feedAllContent', () => {
    // Preparación
    const app = document.createElement('section');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadHTML();
    // Aserción: Comprobamos la existencia de elementos específicos
    const asideProfile = app.querySelector('#feedAside');
    expect(asideProfile).not.toBeNull();

    const feedScroll = app.querySelector('#feedScroll');
    expect(feedScroll).not.toBeNull();
  });
});

describe('Feed test aside for profile', () => {
  test('Content of elements in aside', () => {
    // Preparación
    const app = document.createElement('aside');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadHTML();
    // Aserción: Comprobamos la existencia de elementos específicos
    const imageProfile = app.querySelector('#feedProfileImage');
    expect(imageProfile).not.toBeNull();

    const nameProfile = app.querySelector('#feedNameProfile');
    expect(nameProfile).not.toBeNull();

    const welcome = app.querySelector('#feedWelcome');
    expect(welcome).not.toBeNull();

    const feedIntroduction = app.querySelector('#feedIntroduction');
    expect(feedIntroduction).not.toBeNull();
  });
});

describe('Feed test feedScroll', () => {
  test('Content of elements in feedScroll', () => {
    // Preparación
    const app = document.createElement('section');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadHTML();
    // Aserción: Comprobamos la existencia de elementos específicos
    const randomImages = app.querySelector('#randomImages');
    expect(randomImages).not.toBeNull();

    const newPostSection = app.querySelector('#newPost');
    expect(newPostSection).not.toBeNull();

    const feedScrollContent = app.querySelector('#feedScrollContent');
    expect(feedScrollContent).not.toBeNull();
  });
});

describe('Feed test feedRandomImages', () => {
  test('Content of elements in randomImages', () => {
    // Preparación
    const app = document.createElement('div');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadHTML();
    // Aserción: Comprobamos la existencia de elementos específicos
    const adoptionLetter = app.querySelector('#adoptionLetter');
    expect(adoptionLetter).not.toBeNull();

    const randomAbeja = app.querySelector('#randomAbeja');
    expect(randomAbeja).not.toBeNull();

    const randomDog = app.querySelector('#randomDog');
    expect(randomDog).not.toBeNull();
  });
});

describe('Feed test newPost section', () => {
  test('Content of elements in newPost section', () => {
    // Preparación
    const app = document.createElement('section');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadHTML();
    // Aserción: Comprobamos la existencia de elementos específicos
    const newPostParagraph = app.querySelector('.newPost');
    expect(newPostParagraph).not.toBeNull();

    const newPostInput = app.querySelector('#feedNewPost');
    expect(newPostInput).not.toBeNull();

    const buttons = app.querySelector('.botones');
    expect(buttons).not.toBeNull();
  });
});

describe('Feed test newPost buttons', () => {
  test('Content in buttons', () => {
    // Preparación
    const app = document.createElement('div');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadHTML();
    // Aserción: Comprobamos la existencia de elementos específicos
    const isButtonPublish = app.querySelector('#publish');
    expect(isButtonPublish).not.toBeNull();

    const isButtonCancel = app.querySelector('#cancel');
    expect(isButtonCancel).not.toBeNull();
  });
});

/* describe('Feed test div feedScrollContent', () => {
  test('Content of elements in div feedScrollContent', () => {
    // Preparación
    const app = document.createElement('div');
    // Ejecucion con los actores: Aquí cargamos el HTML en el contenedor
    app.innerHTML = feed.loadEvents();
    // Aserción: Comprobamos la existencia de elementos específicos
  });
}); */

describe('Test function newPost', () => {
  it('newPost is a function', () => {
    expect(typeof newPost).toBe('function');
  });
});

describe('Test function subscribeToDataChanges', () => {
  it('subscribeToDataChanges is a funcion', () => {
    expect(typeof subscribeToDataChanges).toBe('function');
  });
});

describe('Test function logoutSesion', () => {
  it('logoutSesion is a funcion', () => {
    expect(typeof logoutSesion).toBe('function');
  });
});

describe('Test function deletePost', () => {
  it('deletePost is a funcion', () => {
    expect(typeof deletePost).toBe('function');
  });
});

describe('Test function updatePost', () => {
  it('updatePost is a funcion', () => {
    expect(typeof updatePost).toBe('function');
  });
});

describe('Test function updatePostLike', () => {
  it('updatePostLike is a funcion', () => {
    expect(typeof updatePostLike).toBe('function');
  });
});

describe('Test function getDataUser', () => {
  it('getDataUser is a funcion', () => {
    expect(typeof getDataUser).toBe('function');
  });
});
