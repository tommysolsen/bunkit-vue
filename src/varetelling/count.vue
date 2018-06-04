<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Varetelling</f7-nav-title>
    </f7-navbar>
    <f7-list media-list>
      <f7-list-item v-bind:after="itemName">
        <f7-input type="number" :value="code" @input="code = $event.target.value" @change="updateView" placeholder="Varenummer" validate pattern="[0-9]{4,6}" error-message="Skriv et gyldig varenummer"/>
      </f7-list-item>
      <f7-list-item>
        <f7-list-item-row>
          <f7-list-item-cell>
            <f7-input ref="quantity" type="number" :value="quantity" @input="quantity = $event.target.value" placeholder="Quantity" size="70%" validate pattern="[0-9,\.]{1,5}"/>
          </f7-list-item-cell>
          <f7-list-item-cell>
            <f7-input type="number" :value="liters" @input="liters = $event.target.value"  placeholder="Unit" size="30%" validate pattern="[0-9,\.]{1,4}"/>
          </f7-list-item-cell>
        </f7-list-item-row>
      </f7-list-item>
      <f7-list-item>
        <f7-list-button color="green" @click="count" no-fast-click disabled>Count</f7-list-button>
      </f7-list-item>
    </f7-list>
    <f7-list media-list v-show="showLastCounts">
       <f7-list-item v-for="item in lastCounts" :key="item.id" :title="item.name" :footer="item.code" :badge-color="getStatusColor(item.state)" :badge="getStatusText(item.state)">{{item.quantity * item.unit}} L</f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  props: {
    initialCode: {
      type: String,
      default: ""
    },
    initialQty: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      code: "",
      quantity: "",
      liters: ""
    }
  },
  mounted: function() {
    this.code = this.initialCode
    this.liters = this.initialQty
  },
  computed: {
      itemName: function(event) {
      let ret = undefined;
      this.$store.state.items.forEach( item => {
        if(item.code === this.code){
          ret = item.name
        }
      })

      return ret ? ret : "Unknown"
    },
    itemCount: function(ev) {
      let ret = undefined;
      this.$store.state.items.forEach( item => {
        if(item.code === this.code){
          ret = item.quantity
        }
      })
      return ret ? ret : "1"
    },
    lastCounts: function(ev) {
      return this.$store.state.counts.slice(-3)
    },
    showLastCounts: function(ev) {
      return this.$store.state.counts.length > 0
    },
    isValid: function() {
      if(this.code == "" || this.quantity == "" || this.liters == "")
        return false
      return true
    }
  },
  methods: {
    count: function(ev) {
      console.log("count", ev)
      if(!this.isValid) {
        console.log("not valid")
        return;
      }
      this.$store.commit('addCount', {
        name: this.itemName,
        code: this.code,
        quantity: this.quantity,
        unit: this.liters,
        state: 0
      })
      this.code = ""
      this.quantity = ""
    },
    updateView: function () {
      let ret = undefined
      this.$store.state.items.forEach( item => {
        if(item.code === this.code){
          ret = item.quantity
          return
        }
        
      })
      console.log(ret)
      if(ret) {
          this.liters = ret;
        }
    },
    getStatusText: function(code) {
      return {
        0: "Not Processed",
        1: "Sent",
        2: "Network Error",
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

<style scoped>
  .inh {
    display: inline;
    padding: 4px;
  }
  .inh.qty-box {
    float: left;
    width: 55vw;
  }
  .inh.unit-box {
    float: right;
    width: 30vw;
  }
</style>
