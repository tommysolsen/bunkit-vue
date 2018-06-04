<template>
  <!-- App -->
  <div id="app">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Right Panel
    <f7-panel right cover theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel> -->

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen" v-bind:opened="loginScreenOpened">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form ref="form">
            <f7-list-item>
              <f7-label>Username</f7-label>
              <f7-input name="username" placeholder="Username" :value="teller" @input="teller = $event.target.value" type="text"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" v-on:click="trylogin"></f7-list-button>
            <f7-block-footer>
              <p>Click Sign In to close Login Screen</p>
              <p v-show="show_error" class="red">{{ errormsg }}</p>
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data: () => {
    return {
      errormsg: "",
      teller: null
    }
  },
  computed: {
    loginScreenOpened: function() {
      return this.$store.state.apiKey == ""
    },
    show_error: function() {
      return this.errormsg != "";
    }
  },
  created: function () {
    this.fetchData()
    if(window.localStorage.getItem("api-expires") < Date.now())
    {
      window.localStorage.clear("api-expires")
      window.localStorage.clear("api-key")
      window.localStorage.clear("teller-name")
    } else {
      this.$store.state.apiKey = window.localStorage.getItem("api-key")
      this.$store.state.teller = window.localStorage.getItem("teller-name")
    }
  },
  methods: {
    fetchData: function () {
      axios.get("http://varetelling.tommyolsen.net/api/items")
      .then((response)=>{
        console.log("ok", response)
        this.$store.state.items = response.data;
      })
      .catch((error) => {
        console.log("church", error)
      })
  
    },
    trylogin: function () {
      /*
      let formData = new FormData()
      formData.set('name', this.teller)
      axios({
        method: 'post',
        url: 'http://varetelling.tommyolsen.net/count/session.json',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })*/
      axios.post("http://varetelling.tommyolsen.net/count/session.json", "name=" + encodeURIComponent(this.teller), {headers: {'Content-Type': 'multipart/form-data'}})
      .then( response => {
        this.$store.state.teller = this.teller
        this.$store.state.apiKey = response.data.api_key
        window.localStorage.setItem("api-key", response.data.api_key);
        window.localStorage.setItem("teller-name", this.teller)
        let date = new Date(Date.now())
        date.setDate(date.getDate() +1 )
        window.localStorage.setItem("api-expires", date.getTime());
      })
      .catch( error => {
        console.log("error", error)
        if(error.response) {
          if(error.response.status == 433)
            this.errormsg = "User doesn't exist";
        } else {
          this.errormsg = error
        }
      })
    },
    remKey: function() {
      window.localStorage.clear("api-key")
      window.localStorage.clear("api-expires")
      window.localStorage.clear("teller-name")
      return true;
    }
  }
}
</script>

<style>
  p.red {
    color: red;
  }
</style>
