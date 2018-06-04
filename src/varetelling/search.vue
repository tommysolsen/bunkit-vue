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
      <f7-list-item :link="makeLink(item.code, item.quantity)" v-for="item in search_results" v-bind:key="item.code" v-bind:footer="item.code">{{ item.name }}</f7-list-item>
    </f7-list> 
  </f7-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProductSearch',
  data: function() {
    return {
      spinner: false,
      term: ""
    }
  },
  created: function() {
    
  },
  computed: {
    search_results: function(event) {
      if(this.term == "" || this.term.length <= 2) {
        return this.$store.state.items;
      } 
      let tmp = this.$store.state.items;
      this.term.split(" ").forEach((term)=> {
        tmp = tmp.filter( (item) => item.code.includes(term) || item.name.toUpperCase().includes(term.toUpperCase()))
      })
      return tmp
    }
  },
  methods: {
    makeLink: function(code, qty) {
      return "/count/" + code + "/" + qty;
    }
  }
}
</script>

<style>
  
</style>
