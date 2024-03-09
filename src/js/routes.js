import HomePage from '../pages/home.svelte';
import SplashPage from '../pages/splash.svelte'
import RegisterPage from '../pages/register.svelte'
import { writable } from 'svelte/store'; // Import store untuk menyimpan variabel global

export const isOpenStore = writable(false);

var routes = [
  {
    path: '/',
    component: SplashPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },

];

export default routes;
