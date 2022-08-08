<template>
  <div id="main-app">
    <router-view></router-view>
    <Footer v-show="this.$store.state.isFooter"></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
#main-app {
  margin-top: 45px;
  background-color: #f5f5f5;
  height: calc(100vh - 45px);
}
</style>
