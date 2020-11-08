<template>
  <div class="main">
    <div class="back-img">
      <img src="./assets/img/bg/bg.jpg" alt="404">
    </div>

    <div id="app">
    <tap-bar></tap-bar>
  </div>
  </div>
</template>

<script>
import TapBar from './components/common/tapbar/tapBar'

export default {
  name: 'app',
  components: {
    TapBar
  }
}
</script>

<style scoped>
.center-m {
  position: relative;
}
.btm-b {
  position: relative;
}
#app {
  width: 1400px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  background: #fff;
}
.back-img {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.main{
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.back-img img {
  width: 100%;
}
</style>
