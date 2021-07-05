import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
const FieldValue = firebase.firestore.FieldValue;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
      email: '',
      firstName: '',
      lastName: '',
      portfolio: [],
      /**
       *  Layout for "portfolio"
       * {
       *  coinID: bitcoin,
       *  amount: 0.00234
       * }
       */
      watchlist: [],
      /**
       * Layout for "watchlist"
       * {
       *  coinID: bitcoin,
       * }
       */
      loggedIn: false,
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = {
        uid: payload.uid,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        portfolio: payload.portfolio,
        watchlist: payload.watchlist,
        loggedIn: true,
      }
    },
    REMOVE_USER(state) {
      state.user = {
        uid: '',
        email: '',
        firstName: '',
        lastName: '',
        portfolio: [],
        watchlist: [],
        loggedIn: false,
      }
    },
    ADD_TO_WATCHLIST(state, payload) {
      state.user.watchlist = state.user.watchlist.push(payload);
    },
    REMOVE_FROM_WATCHLIST(state, payload) {
      state.user.watchlist = state.user.watchlist.filter(itemID => itemID !== payload)
    }
  },
  actions: {
    async fetchUser({ commit, state }, payload) {
      //console.log(payload)
      //checks if an existing user profile is set

      if(state.user.email !== payload.email) {
        const usersRef = firebase.firestore().collection('users');
        const userDoc =  usersRef.doc(payload.uid)
        const userData = await userDoc.get().then(doc => doc.data())
        console.log(userData)

        let userPayload = {
          uid:  payload.uid,
          email:  payload.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          portfolio: userData.portfolio,
          watchlist: userData.watchlist
        }
        commit("SET_USER", userPayload);
        return
      }
      return
    },
    removeUser({ commit }) {
      commit("REMOVE_USER");
    },
    async addToWatchlist({ commit, state }, payload) {
      let updatedWatchlist = state.user.watchlist ? state.user.watchlist : []
      updatedWatchlist.push(payload.id)
      console.log(updatedWatchlist)

      const userDoc = firebase.firestore().collection('users').doc(state.user.uid)
      await userDoc.update({
        watchlist: updatedWatchlist
      })
      .then(() => commit("ADD_TO_WATCHLIST", payload.id))
      .catch((err) => console.error(err));
      return
    },
    async removeFromWatchlist({ commit, state }, payload) {
      let updatedWatchlist = state.user.watchlist ? state.user.watchlist : []
      console.log(updatedWatchlist)
      const removeIndex = updatedWatchlist.indexOf(payload.id)
      updatedWatchlist.splice(removeIndex, 1);
      const userDoc = firebase.firestore().collection('users').doc(state.user.uid)
      await userDoc.update({
        watchlist: state.user.watchlist.filter(itemID => itemID !== payload.id)
      })
      .then(() => commit("REMOVE_FROM_WATCHLIST", payload.id))
      .catch((err) => console.error(err));
      return
    }
  }
})
