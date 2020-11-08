<template>
  <div id="tapbar">
    <left class="left"> </left>
    <center class="center"></center>
    <right class="right"> </right>
  </div>
</template>

<script>
import Left from "./left";
import Center from "./center";
import Right from "./right";
export default {
  components: {
    Left,
    Center,
    Right,
  },
  data() {
    return {
        
    };
  },
  methods: {},
};
</script>
<style>
.inputt input.el-input__inner {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: #888;
}
</style>
<style scoped>
#tapbar {
  width: 100%;
  height: 60px;
  background-color: #5292fe;
  display: flex;
  justify-content: space-between;
  position: relative;
}

</style>