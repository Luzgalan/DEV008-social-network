import feed from './components/feed/feed';
import login from './components/login/login';
import register from './components/register/register';

export const routes = {
  '/': login,
  '/register': register,
  '/feed': feed,
};
