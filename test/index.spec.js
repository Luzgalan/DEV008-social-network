// importamos la funcion que vamos a testear
/* import { feedMock } from '../src/components/feed/feed.mock'; */
import { updatePostLike } from '../src/components/feed/feed.controller';

describe('updatePostLike', () => {
  it('debería ser una función', () => {
    expect(typeof updatePostLike).toBe('function');
  });
});
