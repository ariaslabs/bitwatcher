import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import {nanoid} from 'nanoid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
      email: '',
      firstName: '',
      lastName: '',
      /**
       *  Layout for "portfolio"
       * {
       *  coinID: bitcoin,
       *  amount: 0.00234,
       *  history: [
       *    {
       *      date: '',
       *      amount: ''
       *     }
       *  ]
       * }
       */
      portfolio: [],
      /**
       * Layout for "watchlist"
       *  [ bitcoin,]
       */
      watchlist: [],
      loggedIn: false,
      
    },
    alerts: [] 

    // {
    //   id: "12Dsde",
    //   type: "error",
    //   icon: "alert-box",
    //   message: "This is a test"
    // }
    
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
    EDIT_USER(state, payload){
      state.user.firstName = payload.firstName
      state.user.lastName = payload.lastName
    },
    ADD_TO_WATCHLIST(state, payload) {
      state.user.watchlist.push(payload);
    },
    REMOVE_FROM_WATCHLIST(state, payload) {
      state.user.watchlist = state.user.watchlist.filter(itemID => itemID !== payload)
    },
    REMOVE_ALERT(state, payload) {
      state.alerts = state.alerts.filter(item => item.id !== payload)
    },
    ADD_ALERT(state, payload) {
      state.alerts.push(payload);
    },
  },
  actions: {
    async fetchUser({
      commit,
      state
    }, payload) {

      if (state.user.email !== payload.email) { //checks if an existing user profile is set
        const usersRef = firebase.firestore().collection('users');
        const userDoc = usersRef.doc(payload.uid)
        const userData = await userDoc.get().then(doc => doc.data())

        let userPayload = {
          uid: payload.uid,
          email: payload.email,
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
    removeUser({
      commit
    }) {
      commit("REMOVE_USER");
    },
    async editUser({commit, dispatch, state}, payload) {
      const userDoc = firebase.firestore().collection('users').doc(state.user.uid)
      await userDoc.update({
        firstName: payload.firstName,
        lastName: payload.lastName
      })
      .then(() => commit("EDIT_USER", payload))
      .then(() => dispatch("addAlert", {
        id: nanoid(),
        type: 'info',
        icon: 'success',
        message: 'Updated Account.'
      }))
      .catch((err) => console.error(err));
    },
    async addToWatchlist({
      commit,
      state
    }, payload) {

      let updatedWatchlist = state.user.watchlist
      updatedWatchlist.push(payload.id)

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
      const removeIndex = updatedWatchlist.indexOf(payload.id)
      updatedWatchlist.splice(removeIndex, 1);
      const userDoc = firebase.firestore().collection('users').doc(state.user.uid)
      await userDoc.update({
          watchlist: state.user.watchlist.filter(itemID => itemID !== payload.id)
        })
        .then(() => commit("REMOVE_FROM_WATCHLIST", payload.id))
        .catch((err) => console.error(err));
      return
    },
    async removeAlert({commit}, payload) {
      commit('REMOVE_ALERT', payload)
    },
    async addAlert({commit}, payload) {
      commit('ADD_ALERT', payload)
    }
  }
})