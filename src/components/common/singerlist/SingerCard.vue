<template>
  <div class="singer-card">
    <div class="sing-img">
      <img :src="item.picUrl" alt="404">
    </div>
    <div class="buttom">
      <a href="#" style="color: red">{{item.name}}</a>
      <i :class="[item.accountId === undefined ? '' : 'el-icon-user s-user']" ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.singer-card {
  width: 18%;
  margin: 15px 5px 0 0;
}
.singer-card > div {
  width: 100%;
}
.sing-img img{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.buttom{
    margin-top: 8px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
}
.s-user{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #5292fe;
    text-align: center;
    line-height: 15px;
}
</style>