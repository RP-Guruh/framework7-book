
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    isOpen: false
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
