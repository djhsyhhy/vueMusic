<template>
  <div class="main">
    <div class="back-img">
      <img src="./assets/img/bg/bg.jpg" alt="404">
    </div>

    <div id="app">
    <tap-bar ></tap-bar>
    <center-all class="center-m"></center-all>
    <bottom-bar class="btm-b"></bottom-bar>

  </div>
  </div>
</template>

<script>
import TapBar from './components/common/tapbar/tapBar'
import CenterAll from "views/center/CenterAll";
import BottomBar from "components/common/bottombar/BottomBar";

export default {
  name: 'app',
  components: {
    TapBar,
    CenterAll,
    BottomBar
  }
}
</script>

<style scoped>

.center-m {
  position: relative;
}
.btm-b {
  position: absolute;
  width: 100%;
  bottom: 0;
  background: #fff;
  margin: 0 auto;
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
