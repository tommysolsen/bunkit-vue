<template>
  <f7-page>
    
  <f7-navbar title="Varesøk" back-link="Back"></f7-navbar>
    <f7-list form>
      <f7-list-item>
        <f7-label>Mine tellinger</f7-label>
      </f7-list-item>
    </f7-list>
    <f7-list media-list>
      <f7-list-item v-for="item in entries" :key="item.id" :title="item.name" :subtitle="item.code" :badge-color="getStatusColor(item.state)" :badge="getStatusText(item.state)">{{item.quantity * item.unit}} L</f7-list-item>
    </f7-list> 
  </f7-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Entry',
  data: function() {
    return {
    }
  },
  created: function() {
    
  },
  computed: {
    entries: function () {
      return this.$store.state.counts
    }
  },
  methods: {
    getStatusText: function(code) {
      return {
        0: "Not Processed",
        1: "Sent",
        2: "Unprocessable",
        3: "Accepted",
        434: "Item not found",
        435: "Could not count",
        436: "Item not in set"
      }[code]
    },
    getStatusColor: function(code) {
      return {
        0: "gray",
        1: "blue",
        2: "red",
        3: "green",
        434: "red",
        435: "red",
        436: "red"
      }[code]
    }
  }
}
</script>

<style>
  
</style>
