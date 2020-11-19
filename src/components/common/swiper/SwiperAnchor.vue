<template>
  <div class="swipe">
    <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in swipers" :key="item.encodeId">
          <el-image
          
          :src="item.pic || item.imageUrl"
          fit="contain"
          style="height: 100%;"
        ></el-image>
        <el-tag
          :type="item.typeTitle !== '独家' ? 'danger' : 'primary'"
          effect="dark"
          style="position: absolute; top:76%;right:0;border-radius: 10px 0 0 10px;height:19px;lineHeight:19px"
        >{{item.typeTitle}}</el-tag>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    swipers: {
      type: Array,
      default() {
        return []
      }
    }
  }

}
</script>

<style scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>