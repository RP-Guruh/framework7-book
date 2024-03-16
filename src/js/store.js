
import { createStore } from 'framework7/lite';
import { APP_KEY } from '../config/env';

const store = createStore({
  state: {
    isOpen: false,
    appKey: APP_KEY
  },
  getters: {
    isOpen({ state }) {
      return state.isOpen;
    }
  },
  actions: {
    changeisOpen({ state }) {
        state.isOpen = true;
    }
  }
})
export default store;
