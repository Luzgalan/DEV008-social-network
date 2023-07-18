/**
 * @jest-environment jsdom
 */

import { loginWithGoogle, createUser, getUserByEmail } from '../src/components/login/login.controller';
import login from '../src/components/login/login';

describe('Test function loginWithGoogle', () => {
  it('loginWithGoogle is a function', () => {
    expect(typeof loginWithGoogle).toBe('function');
  });
});

describe('Test function createUser', () => {
  it('createUser is a function', () => {
    expect(typeof createUser).toBe('function');
  });
});

describe('Test function getUserByEmail ', () => {
  it('getUserByEmail  is a function', () => {
    expect(typeof getUserByEmail).toBe('function');
  });
});

describe('Button Login google test suite', () => {
  test('Content a button in the interface', () => {
    // preparacion
    const app = document.createElement('div');
    // ejecucion Los actores
    app.innerHTML = login.loadHTML();
    const isButton = app.querySelector('#btnLoginGoogle');
    // asercion
    expect(isButton).not.toBeNull();
  });
});
describe(' formLogin test suite ', () => {
  test('Content a button in the interface', () => {
    // preparacion
    const app = document.createElement('div');
    // ejecucion Los actores
    app.innerHTML = login.loadHTML();
    const isButton = app.querySelector('#formLogin');
    // asercion
    expect(isButton).not.toBeNull();
  });
});
