import Vue from "vue"
import Vuex from "vuex"
import VuexPersist from 'vuex-persist'
import axios from 'axios'
import {v4} from 'uuid'
Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'teller-app',
  storage: window.localStorage
})


export default new Vuex.Store({
  state: {
    items: [],
    itemsLoaded: false,
    counts: [],
    currentUser: null,
    basePath: "http://127.0.0.1:3000/",
    loginError: null
  },
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
    currentUser: (state, getters) => getters.isLoggedIn ? {
      name: state.currentUser.name,
      apiKey: state.currentUser.api_key
    } : null,
    URL: (state) => (param) => state.basePath + param,
    loginError: (state) => state.loginError,
    hasLoginError: (state) => state.loginError != null,
    itemCount: (state) => state.items.length,
    itemsLoaded: (state) => !!state.itemsLoaded,
    getItemByCode: (state) => (code) => {
      for(var i = 0; i < state.items.length; i++) {
        const item = state.items[i]
        if(item.code == code)
          return item
      }
      return null
    },
    getLastCounts: (state) => state.counts.slice(-3).reverse(),
    getStatusString: (_state) => ({state}) => ({
        STORED: "Stored",
        SENT: "Sent",
        NETWORK_ERROR: "Network Error",
        NOT_IN_SET: "Not in set",
        ITEM_NOT_FOUND: "Item not found",
        ACCEPTED: "Accepted",
        DROPPED: "Dropped",
    }[state] || "Unknown State"),
    getStatusColor: (_state) => ({state}) => ({
      STORED: "gray",
      SENT: "blue",
      NETWORK_ERROR: "red",
      NOT_IN_SET: "red",
      ITEM_NOT_FOUND: "red",
      ACCEPTED: "green",
      DROPPED: "red"
  }[state] || "Unknown State")
  },
  actions: {
    loginUser(context, name) {
        context.commit('LOGIN_USER', name)
    },
    logoutUser: ({ commit }) => commit('LOGOUT_USER'),
    getItems(context, force = false) {
      context.commit('POPULATE_ITEM_ARRAY', force)
    },
    performCount({commit}, payload) {
      commit('PERFORM_COUNT', payload)
    }
  },
  mutations: {
    async LOGIN_USER(state, name) {
      try {
        const response = await axios.post(
          state.basePath + "api/login",
          {
            name: name
          },
          {
            headers: {
              'Content-Type': "application/json"
            }
          }
        )
        state.currentUser = response.data
        state.loginError = null
      } catch(e) {
        state.loginError = e.response.data.error
      }
    },
    LOGOUT_USER(state) {
      return state.currentUser = null
      return state.items = []
    },
    async POPULATE_ITEM_ARRAY(state, force = false) {
      try {
        if(state.itemsLoaded && !force)
          return
        state.itemsLoaded = false
        const response = await axios.get(
          state.basePath + "api/items",
          {
            headers: {
              "Authorization": `Bearer ${state.currentUser.api_key}`
            }
          }
        )
        console.log(response)
        state.items = response.data || []
        state.itemsLoaded = true
      } catch(e) {
        state.items = []
        state.itemsLoaded = false
      }
    },
    async PERFORM_COUNT(state, payload) {
      payload.uuid = v4()
      payload.state = "STORED"
      state.counts = [...state.counts, ...[payload]]
      const index = state.counts.length - 1
      const SendPayload = async (payload, timeout = 5000) => {
        try {
          state.counts[index].state = "SENT"
          const _response = await axios.post(
            state.basePath + `api/inventory_sessions/${state.currentUser.inventory_session_id}/count`,
            {
              count: payload
            },
            {
              headers: {
                'Authorization': `Bearer ${state.currentUser.api_key}`,
                'Content-Type': "application/json"
              }
            }
          )
          state.counts[index].state = "ACCEPTED"
        } catch(e) {
          if(e.response && e.response.data) {
            if(e.response.data.error) {
              switch(e.response.data.error) {
                case "NOT_IN_SET":
                  state.counts[index].state = "NOT_IN_SET"
                  break;
                default:
                  state.counts[index].state = "UNKNOWN"
                  break;
              }
            } else if(e.message && e.message == "Network Error") {
              state.counts[index].state = "NETWORK_ERROR"
              if(timeout < 60000)
                setTimeout(() => SendPayload(payload, timeout * 2), timeout * 2)
              else
                state.counts[index].state = "DROPPED"
            }
          }
        }
      }
      SendPayload(payload)
    }
  },
  plugins: [
    vuexPersist.plugin
  ]
})
