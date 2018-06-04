<template>
    <div class="spinner" v-bind:class="{show: show}">
      <div class="inner">
        <div class="spinner"></div>
        Fetching information
      </div>
    </div>
</template>

<script>
export default {
  name: "ScreenOverlay",
  props: {
    show: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: "Fetching infoz"
    }
  }
}
</script>

<style scoped>
  .spinner {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transform: translateX(-100vw);
    transition: opacity 400ms ease 50ms;
  }
  .spinner.show {
    transform: translateX(0px);
    opacity: 1.0;

  }
  .spinner > .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: red;
  }
  .spinner > .inner > .spinner {
    border: 1em black solid;
    border-radius: 1em;
  }
</style>
