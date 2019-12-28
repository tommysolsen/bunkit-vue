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
        <f7-list-button color="green" @click="count" no-fast-click :disabled="isValid">Count</f7-list-button>
      </f7-list-item>
    </f7-list>
    <f7-list media-list v-if="getLastCounts.length > 0">
       <f7-list-item
        v-for="item in getLastCounts"
        :key="item.id"
        :title="item.name"
        :footer="item.code"
        :badge-color="getStatusColor(item)"
        :badge="getStatusString(item)"
      >
        {{item.quantity * item.units}} L
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
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
      liters: "",
      currentItem: null
    }
  },
  mounted: function() {
    this.code = this.initialCode
    this.liters = this.initialQty
  },
  computed: {
    ...mapGetters([
      'getItemByCode',
      'getLastCounts',
      'getStatusString',
      'getStatusColor'
    ]),
    itemName: function(event) {
      return this.currentItem ? this.currentItem.name : "UNKNOWN";
    },
    itemCount: function(ev) {
      return this.currentItem ? this.currentItem.quantity : "1";
    },
    isValid: function() {
      return !!this.currentItem && !!this.quantity
    }
  },
  methods: {
    ...mapActions([
      'performCount'
    ]),
    count: function(ev) {
      console.log("count", ev)
      if(!this.isValid) {
        console.log("not valid")
        return;
      }
      this.performCount({
        name: this.currentItem.name || "Unknown",
        code: this.code,
        quantity: this.quantity,
        units: this.liters
      })
      this.code = ""
      this.quantity = ""
    },
    updateView: function () {
      this.currentItem = this.getItemByCode(this.code)
      this.liters = this.currentItem ? this.currentItem.quantity : 1
    },
  },
  watch: {
    code(n) {
      if(n == "") {
        this.currentItem = null
      }
      this.currentItem = this.getItemByCode(n)
      console.log(this.currentItem)
      this.liters = this.currentItem ? this.currentItem.quantity : 1
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
