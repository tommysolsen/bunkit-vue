<template>
  <f7-page>

  <f7-navbar title="Varesøk" back-link="Back"></f7-navbar>
    <f7-list form>
      <f7-list-item>
        <f7-label>Mine tellinger</f7-label>
      </f7-list-item>
    </f7-list>
    <f7-list media-list>
      <f7-list-item>
        <f7-button @click="clearCounts">Clear list</f7-button>
      </f7-list-item>
      <f7-list-item v-for="item in entries(30)" :key="item.id" :title="item.name" :subtitle="item.code" :badge-color="getStatusColor(item)" :badge="getStatusText(item)">{{item.quantity * item.units}} L</f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Entry',
  data: function() {
    return {
    }
  },
  created: function() {

  },
  computed: {
    ...mapGetters({
      entries: 'getNthLastCounts',
      getStatusColor: 'getStatusColor',
      getStatusText: 'getStatusString'
    })
  },
  methods: {
    ...mapActions([
      'clearCounts'
    ])
  }
}
</script>

<style>

</style>
