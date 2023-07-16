/**
 * @jest-environment jsdom
 */

import register from '../src/components/register/register';

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
