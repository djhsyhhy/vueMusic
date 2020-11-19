<template>
  <div class="title-icon" >
    <div class="title-item" v-for="(item, index) in cateList" :key="index" @click="handel(item.id)">
      <div class="img">
        <img :src="item.picIPadUrl" alt="404" />
      </div>
      <p>{{ item.name }}</p>
    </div>

  </div>
</template>

<script>
import { getAnchorCateList } from "network/anchor";
export default {
  data() {
    return {
      cateList: []
    }
  },
  methods: {
    handel(id) {
      this.$router.push('/anchor' + id)
    },
    getAnchorCateList() {
      getAnchorCateList().then(res => {
        this.cateList = res.categories.slice(0, 5)
      })
    }
  },
  created() {
    this.getAnchorCateList()
  },
}
</script>

<style scoped>
.title-icon {
  width: 80%;
display: flex;
margin: 0 auto;
justify-content: space-around;
}
.title-item{
    width: 16%;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
    color: rgba(255, 0, 0, 0.7);
    margin: 0 50px;
    padding: 10px 0;
}
.title-item:hover{
    background: #e8e8e8;
    color: red;
}
.img img{
    width: 35px;
    height: 35px;
}
</style>