<template>
  <div class="center">
     
        <div >
            <a href='javascript:void(0)' @click.stop="togBack">
            <i class="el-icon-arrow-left"></i>
          </a>
          <a href>
            <i class="el-icon-refresh"></i>
          </a>
          
        </div>
        <div class="inputSq">
          <el-input
            size="mini"
            class="inputt"
            placeholder="请输入内容"
            v-model="input"
            clearable
            suffix-icon="el-icon-search"
             @keyup.enter.native="togSearch"
          ></el-input>
        </div>
        <div >
          <a href>
            <i class="el-icon-microphone"></i>
          </a>
        </div>
  </div>
  
</template>

<script>
export default {
data() {
  return {
    input: ''
  }
},

methods: {
  togBack() {
      this.$router.back();
    },
},
}
</script>

<style scoped>
.center {
  display: flex;
 justify-content: space-between;
 margin-top: 4px;
}
.inputSq {
  width: 360px;
  margin: 12px 0 0 15px;
}
.center a i {
  font-size: 20px;
  margin: 14px 0 0 15px;
  color: #fff;
}
.center a i:hover {
  color: #fff;
}
</style>>
