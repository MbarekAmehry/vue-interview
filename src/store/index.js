import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const base_url = 'https://api.themoviedb.org/3';
const APP_KEY = 'bbe220c0cdf3879ab4296132d5764264';
const SESSION_ID = 'dde06139373c7b9299d9871ed07a8f4ebc528208';

export default new Vuex.Store({
  state: {
    lists: null,
  },
  mutations: {
    SET_LIST(state, data) {
      return (state.lists = data);
    },
    CREATE_LIST(state, item) {
      state.lists.results.unshift(item);
    },
    DELETE_LIST(state, id) {
      const index = state.lists.results.findIndex((list) => list.id === id);
      state.lists.results.splice(index, 1);
    },
  },
  actions: {
    fetchLists({ commit }, page = 1) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${base_url}/account/{account_id}/lists?api_key=${APP_KEY}&session_id=${SESSION_ID}&page=${page}`
          )
          .then((response) => {
            commit('SET_LIST', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    createList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${base_url}/account/{account_id}/lists?api_key=${APP_KEY}&session_id=${SESSION_ID}`,

            payload
          )
          .then((response) => {
            commit('CREATE_LIST', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteList({ commit }, listID) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `${base_url}/list/${listID}?api_key=${APP_KEY}&session_id=${SESSION_ID}`
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            commit('DELETE_LIST', listID); // this shouldn't be here, I know XD
            // This is a know issue with Themoviedb mentioned here: https://www.themoviedb.org/talk/61425b254f33ad002a4725da?language=es
            reject(error);
          });
      });
    },
  },
  modules: {},
});
