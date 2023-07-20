/**
 * @jest-environment jsdom
 */

import register from '../src/components/register/register';
import { signInUser } from '../src/components/register/register.controller';

describe('Register test suite', () => {
  test('Content a button in the interface', () => {
    // preparacion
    const app = document.createElement('div');
    // ejecucion Los actores
    app.innerHTML = register.loadHTML();
    const isButton = app.querySelector('#Crearcuenta');
    // asercion
    expect(isButton).not.toBeNull();
  });
});

describe('Button Login Google test suite', () => {
  test('Content a button in the interface', () => {
    // preparacion
    const app = document.createElement('div');
    // ejecucion Los actores
    app.innerHTML = register.loadHTML();
    const isButton = app.querySelector('#btnLoginGoogle');
    // asercion
    expect(isButton).not.toBeNull();
  });
});

describe('Test function signInUser', () => {
  it('signInUser is a function', () => {
    expect(typeof signInUser).toBe('function');
  });
});
