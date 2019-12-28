<template>
  <f7-page>

  <f7-navbar title="Varesøk" back-link="Back"></f7-navbar>
    <f7-list form>
      <f7-list-item>
        <f7-label>Varesøk</f7-label>
        <f7-input type="text" :value="term" @input="term = $event.target.value" placeholder="Søketekst"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list media-list>
      <f7-list-item v-if="!search_results.length && !term">Enter search term to search</f7-list-item>
      <f7-list-item v-if="!search_results.length && term">Unable to find anything using that term</f7-list-item>
      <f7-list-item v-else :link="makeLink(item.code, item.quantity)" v-for="item in search_results" v-bind:key="item.code" v-bind:footer="item.code">{{ item.name }}</f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ProductSearch',
  data: function() {
    return {
      spinner: false,
      term: "",
      search_results: []
    }
  },
  computed: {
    ...mapGetters([
      'productSearch'
    ])
  },
  methods: {
    makeLink: function(code, qty) {
      return "/count/" + code + "/" + qty;
    }
  },
  watch: {
    term(nTerm) {
      this.spinner = true
      this.productSearch(nTerm)
      .then((results) => this.search_results = results)
      .catch(e => this.search_results = [])
      .finally(() => this.spinner = false)
    }
  }
}
</script>

<style>

</style>
