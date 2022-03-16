<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  // beforeCreate () {
  //     document.querySelector('body').setAttribute('style', 'margin:0;position:absolute;top:0;left:0;right:0;bottom:0;')
  // },
}
</script>

<style lang="less" scoped>
#app {
 height:100%;
}
</style>
