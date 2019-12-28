<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Varetelling</f7-nav-title>
    </f7-navbar>
    <f7-block-title>Status</f7-block-title>
    <f7-list>
      <f7-list-item title="Items loaded" @click="getItems(true)"> {{ itemsLoaded ? itemCount : 'Laster' }}</f7-list-item>
      <f7-list-item title="Teller"> {{ teller }}</f7-list-item>
      <f7-list-item title="Api Key"> {{ apiKey }}</f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['test'],
  data: function() {
    return {
      state: "Startet"
    }
  },
  methods: {
    ...mapActions([
      'getItems'
    ])
  },
  computed: {
    ...mapGetters([
      'itemCount',
      'itemsLoaded',
      'currentUser',
      'isLoggedIn'
    ]),
    teller: function () {
      return this.isLoggedIn ? this.currentUser.name : ""
    },
    apiKey: function () {
      return this.isLoggedIn ? this.currentUser.apiKey : ""
    }
  },
}
</script>
