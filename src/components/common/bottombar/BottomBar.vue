<template>
  <div class="buttom-bar">
    <div class="scoll">
      <el-slider v-model="value1" :step="10"> </el-slider>
    </div>

    <div class="conter">
        <div class="left">
          <div class="singimg">
            <a href="javascript:void(0)" >
              <div class="s-img">
                <img  alt />
                <div class="m-img">
                  <a href="javascript:void(0)" >
                    <i
                      class="el-icon-arrow-up"
                      style="color: rgba(255, 255, 255, 0.8)"
                    ></i>
                    <i
                      class="el-icon-arrow-up"
                      style="
                        color: rgba(255, 255, 255, 0.8);
                        position: absolute;
                        top: 12px;
                        left: 13px;
                      "
                    ></i>
                  </a>
                </div>
              </div>
            </a>
          </div>
          <div class="sing">
            <div>
              <a href
                >歌手</a
              >
            </div>
            <div class="sing-time">
              <span>时间</span
              >/
              <span>时间</span>
            </div>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-star-off" v-show="true"></i>
              <i class="el-icon-star-on" v-show="false"></i>
            </span>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-download"></i>
            </span>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-chat-dot-square"></i>
            </span>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-more-outline"></i>
            </span>
          </div>
        </div>






      <div class="play">
          <div class="pre" @click="preMusic">
            <span style="cursor: pointer">
              <i class="el-icon-caret-left"></i>
            </span>
          </div>
          <div class="start" @click="playMusic">
            <span style="cursor: pointer">
              <i class="el-icon-video-pause" v-show="isplay"></i>
              <i class="el-icon-video-play" v-show="!isplay"></i>
            </span>
          </div>
          <div class="next" @click="nextMusic">
            <span style="cursor: pointer">
              <i class="el-icon-caret-right"></i>
            </span>
          </div>
        </div>
        <div class="more">
          <div style="marginright: 30px" class="loundBox">
            <a href="#">
              <i class="el-icon-mic"></i>
            </a>
            <div class="lound">
              <el-slider
                v-model="value"
                vertical
                height="60px"
                size="mini"
                @change="volumeChange"
              ></el-slider>
            </div>
          </div>
          <el-button type="primary" class="more-btn">
            倍速
            <i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
          <el-button type="primary" class="more-btn">
            标准
            <i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
          <div>
            <a href="#">
              <i class="el-icon-s-data"></i>
            </a>
          </div>
          <div>
            <a href="#">
              <i class="el-icon-sort"></i>
            </a>
          </div>
          <div>
            <a href="#">
              <i class="el-icon-close-notification"></i>
            </a>
          </div>
          <div>
            <span @click="showRightList" style="cursor: pointer">
              <i class="el-icon-s-unfold"></i>
            </span>
          </div>
        
      </div>
      <audio></audio>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
    };
  },
};
</script>

<style scoped>

.lound {
  position: absolute;
  top: -26px;
  left: 0px;
  display: none;
}
.scroll {
  width: 98%;
  position: absolute;
  top: -22px;
  /* left: 217px; */
}
.more {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
}
.more-btn {
  padding: 0;
  width: 60px;
  height: 20px;
  background: none;
  color: #888;
  margin-right: 8px;
}
.more div i {
  margin-right: 10px;
  font-size: 16px;
  color: #888;
}
.more div:last-of-type {
  margin-right: 200px;
}


.buttom-bar {
  position: relative;
  height: 70px;
  background: rgba(0, 0, 255, 0.1);
}


.conter {
  display: flex;
  justify-content: space-between;
}


.conter .left {
  display: flex;
}
.singimg img {
  width: 45px;
  height: 45px;
}
.s-img {
  position: relative;
}
.s-img:hover .m-img {
  display: block;
}
.m-img {
   position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 62px;
  font-size: 20px;
  border-radius: 5px;
  display: none;
}
.sing {
  font-size: 14px;
}
.sing-time {
  margin: 5px;
}

.icon {
  font-size: 20px;
  margin: 18px 9px 0 8px;
}



.play {
  display: flex;
  justify-content: space-between;
}
.play div {
  font-size: 40px;
  margin-top: 5px;
  margin: 0 5px 0 5px;
}
.play i {
  color:  #5192fe;
}





::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
.buttom-bar .el-dialog {
  position: absolute;
  right: 260px;
  bottom: 80px;
  max-height: 600px;
  overflow: auto;
}
.scroll .el-slider__bar {
  background-image: linear-gradient(to left, #a1c4fd 0%, #c2e9fb 100%);
}
.lound .el-slider__bar {
  background: linear-gradient(#a1c4fd 0%, #c2e9fb 100%);
}
.loundBox:hover .el-slider.is-vertical .el-slider__runway {
  display: block;
}
.lound .el-slider__button {
  width: 10px;
  height: 10px;
}
.lound .el-slider.is-vertical .el-slider__runway {
  width: 4px;
  display: none;
}
</style>