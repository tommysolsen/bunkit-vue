<template>
  <f7-page>
    <f7-navbar title="Tellemeny"></f7-navbar>
    <f7-block-title>Options</f7-block-title>
    <f7-list>
      <f7-list-item link="/count/" title="Count" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/search/" title="Search" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/entries/" title="My entries"></f7-list-item>
      <f7-list-item link="#" title="Logout" view="#main-view" v-on:click="logoutFunc" panel-close></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  name: 'LeftPanel',
  props: ['logoutFunction'],
  methods: {
    logoutFunc: function() {
      this.$store.state.apiKey = ""
      window.localStorage.clear("api-key")
      window.localStorage.clear("api-expires")
      window.localStorage.clear("teller-name")
    }
  }
}
</script>