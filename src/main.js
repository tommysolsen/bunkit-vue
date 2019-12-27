// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';
// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js'

// axios
import axios from 'axios'

// Import App Component
import App from './app';
// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    items: [],
    counts: [],
    teller: "",
    apiKey: ""
  },
  mutations: {
    addCount: function(state, countObject) {
      countObject.id = state.counts.length
      state.counts.push(countObject)
      let formData = {
        "api": state.apiKey,
        "element[code]": countObject.code,
        "element[counted]": countObject.quantity,
        "element[units]": countObject.unit
      }
      formData = Object.keys(formData).map( key => {
        return key + "=" + encodeURIComponent(formData[key])
      }).join("&")

      countObject.promise = function() {
        countObject.state = 1
        axios({
          method: 'post',
          url: '/api/count',
          data: formData,
          timeout: 10000,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
          countObject.state = 3
          console.log("r", response)
        }).catch(error => {
          countObject.state = error.response ? error.response.status : 2
          if(error.message === "Network Error" && error.response === undefined) {
            setTimeout(countObject.promise, 10000)
          }
          console.log("e", error)
        })
      }
      countObject.promise()
    }
  }
})

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: Routes,
  },
  // Register App Component
  components: {
    app: App
  },
  store: store
});
