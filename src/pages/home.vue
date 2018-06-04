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
      <f7-list-item v-show="!loadDone" title="Fetching items">{{state}}</f7-list-item>
      <f7-list-item title="Items loaded"> {{ itemsLoaded }}</f7-list-item>
      <f7-list-item title="Teller"> {{ teller }}</f7-list-item>
      <f7-list-item title="Api Key"> {{ apiKey }}</f7-list-item>
      <f7-list-item title="Form"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  props: ['test'],
  data: function() {
    return {
      state: "Startet"
    }
  },
  computed: {
    itemsLoaded: function() {
      return this.$store.state.items.length;
    },
    loadDone: function () {
      return this.$store.state.items.length > 0
    },
    teller: function () {
      return this.$store.state.teller
    },
    apiKey: function () {
      return this.$store.state.apiKey.slice(0, 15)
    }
  }
}
</script>
