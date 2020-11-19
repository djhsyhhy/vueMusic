<template>
  <div class="centerall">
    <el-container class="ct-container">
      <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
        <left-menu></left-menu>
      </el-aside>
      <el-main>
        <div class="con-all" v-loading="false">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "../left/LeftMenu";
export default {
  components: {
    LeftMenu,
  },
};
</script>

<style scoped>
.centerall {
  position: relative;
  width: 100%;
  height: 600px;
  margin-bottom:60px !important
 
}
.ct-container {
  height: 100%;
}

</style>