<template>
  <div class="MusicListItem" @click="toListPage(item.id)" :style="{ width: 18 + '%' }">
    <el-card :body-style="{ padding: '0px' }">
      <img
        :src="item.coverImgUrl || item.sPicUrl || item.cover"
        class="image"
      />

      <div class="right-t">
        <i
          class="el-icon-headset"
          style="paddingtop: 4px; paddingleft: 15px"
        ></i>
        <span>{{
          item.playCount >= 10000
            ? (item.playCount / 10000).toFixed(0) + "万"
            : item.playCount
        }}</span>
      </div>
      <!-- 小耳机 -->
      <div class="top-t">
        <span>{{ item.name }}</span>
      </div>

      <div class="message">
        <div class="btm">
          <i class="el-icon-video-play"></i>
        </div>

        <div class="user">
          <span><i class="el-icon-user"></i>{{ item.artistName }}</span>
        </div>
        <div class="namet">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {},
  methods: {
    toListPage(id) { //发送请求   （带有id）
    console.log(id)
      if(this.mvType){
        this.$router.push('/mvvideo' + id)
      }
      this.$router.push('/songs' + id)

    }
  },
};
</script>

<style scoped>
.user {
  width: 100%;
  position: absolute;
  bottom: 50px;
  left: 0;
  font-size: 13px;
  color: aliceblue;
  background-image: linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.4));
}
.namet {
  padding-top: 10px;
  font-size: 13px;
  height: 40px;
}
.btm {
  width: 20px;
  height: 20px;
  overflow: hidden;
  transform: translateX(100%);
  transition: transform 0.5s;
  position: absolute;
  bottom: 24%;
  right: 0;
  color: red;
  background-image: linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.4));
}
.btm:hover {
  color: rgba(255, 255, 255, 0.95);
}
.MusicListItem:hover .btm {
  transform: translateX(0);
}

.top-t {
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.5s;
  width: 100%;
  height: 20px;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.95);
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
}
.top-t:hover {
  color: rgba(255, 255, 255, 0.95);
}
.MusicListItem:hover .top-t {
  transform: translateY(0);
}

.right-t {
  width: 80px;
  height: 14px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 2px 2px 0 0;
  font-size: 12px;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
  color: #fff;
  display: flex;
  justify-content: space-evenly;
}

.MusicListItem {
  position: relative;
  margin: 25px 0 10px 0;
  cursor: pointer;
  overflow: hidden;
  line-height: 1.5;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>