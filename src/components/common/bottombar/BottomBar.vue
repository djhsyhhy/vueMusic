<template>
  <div class="buttom-bar">
    <div class="scoll">
      <el-slider  v-model="musicDuration"
          :max="totalDuration"
          @change="musicDurationChange"
          :show-tooltip="false"
          :disabled="isUrl"> </el-slider>
    </div>

    <div class="conter">
      <div class="left">
        <div class="singimg">
          <a href="javascript:void(0)" @click.stop="togSingel">
            <div class="s-img">
              <img :src="getNowMusicMenu.al.picUrl " alt />
              <div class="m-img">
                <a href="javascript:void(0)">
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
            <a href>{{getNowMusicMenu.ar[0].name}} - {{getNowMusicMenu.name || getNowMusicMenu.al.name}}</a>
          </div>
          <div class="sing-time">
            <span>{{musicDuration | showTime}}</span>/
            <span>{{getTime}}</span>
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
        <div class="pre">
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
        <div class="next">
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
              :modal="false"
            :show-close="false"
            title="播放列表"
            :visible.sync="showRightDialog"
            width="23%"
            center
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
          <span style="cursor: pointer">
            <i class="el-icon-s-unfold"></i>
          </span>
        </div>
      </div>
    </div>
    <audio
          :src="getNowMusic"
          autoplay
          class="playMusicAudio"
          ref="audio"
        ></audio>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
  NOW_MUSICMENU,
  NOW_MUSIC,
  ADD_COUNT,
  SUB_COUNT,
  CLEAR_COUNT,
  SET_DURATION,
  SET_PLAY,
} from "@/store/mutationType";
import { timeFormat, songTimeFormat } from "common/uctil";
import { getMusicUrl, getMusicMenu } from "network/home";
export default {
  data() {
    return {
      isplay: false, //播放状态
      musicDuration: 0, //音乐当前播放时间
      totalDuration: 100, //总时长 默认先给个100
      isUrl: true, //设置无歌曲时进度条不可拖动
      value: 100, //音量
      debace: true, //简单防抖
      // 展示右边的歌单对话框
      showRightDialog: false,
    };
  },
  computed: {
    ...mapGetters([
      "getNowMusic",
      "getNowMusicMenu",
      "getMusicListIds",
      "getMusicCount",
      "getDuration",
    ]),
     getTime() {
      return timeFormat(this.getNowMusicMenu.dt);
    },
    
  },
  methods: {
     togSingel() {
       if(!this.getNowMusicMenu.id) return false
       this.$router.push('/singel')
       return false
    },
     playMusic() { //开始暂停
      if (this.getNowMusic !== "") {
        if (!this.$refs.audio.paused) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
        this.isplay = !this.isplay;// 播放状态
        this.$store.commit(SET_PLAY, this.isplay);
      }
      return false;
    },
     musicDurationChange() { //获取歌曲的信息
      let audio = this.$refs.audio;
      audio.currentTime = this.musicDuration;
      // this.$store.commit(SET_DURATION,audio.currentTime);
      // audio.currentTime = this.getDuration;
      audio.addEventListener("timeupdate", () => {
        //获取歌曲的总长度 example: 257s
        this.totalDuration = audio.duration;
        //获取歌曲时间
        this.musicDuration = audio.currentTime;
        this.$store.commit(SET_DURATION, audio.currentTime);
        // 当前歌曲播放完毕自动播放下一首
        if (audio.currentTime >= audio.duration) {
          if (this.getMusicListIds.length > 0) {
            if (this.debace) {
              this.debace = false;
              this.nextMusic();
              setTimeout((res) => {
                this.debace = true;
              }, 500);
            }
          }
          this.isplay = false;
          this.$store.commit(SET_PLAY, this.isplay);
        }
      });
      // if (this.isplay) return;
      this.isplay = true;
      this.$store.commit(SET_PLAY, this.isplay);
    },
  },
  watch: {
    getNowMusic() {
      this.isplay = true;
      this.$store.commit(SET_PLAY, this.isplay);
      this.isUrl = false;
    }
  },
  mounted() {
    this.musicDurationChange()
  },
  filters: {
    showTime(value) {
      return songTimeFormat(value);
    },
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
.scoll {
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
  background: rgba(0, 0, 255, 0.1);
}

.conter {
  display: flex;
  justify-content: space-between;
  justify-items: center;
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
  color: #5192fe;
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