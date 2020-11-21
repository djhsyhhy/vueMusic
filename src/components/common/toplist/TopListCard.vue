<template>
  <div class="top-list-card">
    <div
      class="top"
      :style="{
        background:
          'url(' + cards.coverImgUrl + ') no-repeat 0 -65px/300px 215px',
        height: '90px',
      }"
    >
      <span class="card-time">{{ cards.updateTime | showDate }} 更新</span>
      <i class="el-icon-caret-right top-play"></i>
    </div>
    <div class="center">
      <div
        class="card-row"
        v-for="(item, index) in songs"
        :key="index"
        :class="[currentIndex === index ? 'card-active' : '']"
        @click="handle()"
        @dblclick.stop="playMusic(item.id)" >

        <div class="card-left">
          <div class="card-num">{{ item.num }}</div>
          <!-- <div class="card-hot">392%</div> -->
          <div class="card-song">{{ item.name }}</div>
          <div class="card-lafter">
            {{ item.alia[0] === undefined ? "" : "(" + item.alia[0] + ")" }}
          </div>
        </div>

        <div class="card-sing">{{ item.ar[0].name }}</div>

      </div>
    </div>

    <div class="card-bottom" style="padding: 10px">
      <a
        style="color: #999; fontsize: 12px"
        href="#"
        @click.prevent="togSongList"
        >查看全部＞</a
      >
    </div>
  </div>
</template>

<script>
import { NOW_MUSICMENU, NOW_MUSIC } from "@/store/mutationType";
import { formatDate } from "common/uctil";
import {
  getSongListInfo,
  getMusicMenu,
  getSongListInfoSongs,
  getMusicUrl,
} from "network/home";

export default {
  data() {
    return {
      songMs: [],
      songId: [],
      songs: [],
      nums: 1,
      currentIndex: 0,
    };
  },
  props: {
    cards: {
      type: Object,
      default() {
        return {};
      },
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    //获取相应排行榜歌单
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
        // console.log(res.privileges);
        //只需要显示八条
        this.songMs = res.privileges.splice(0, 8);
        this.songMs.map((item) => {
          this.songId.push(item.id);
        });
        // console.log(this.songId);
        this.songId.map((item) => {
          getSongListInfoSongs(item).then((res) => {
            // console.log(res.songs[0]);
            res.songs[0].num = this.nums++;
            this.songs.push(res.songs[0]);
          });
        });
        // console.log(this.songs);
      });
    },
    handle(i) {
      this.currentIndex = i;
    },
    playMusic(id) {
      console.log(id);
      this.getMusicUrl(id);
      this.getMusicMenu(id);
    },
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    //跳转到相应歌单页面
    togSongList() {
      // console.log(this.id);
      this.$router.push("/songs" + this.id);
    },
  },
  created() {
    this.getSongListInfo(this.id);
  },
  watch: {
    id(val, oldVal) {
      //普通的watch监听
      //  console.log("id: "+val, oldVal);
      this.getSongListInfo(val);
    },
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "MM月dd日");
    },
  }
};
</script>

<style scoped>
.card-bottom {
  display: flex;
  justify-content: flex-end;
  background: #f5f5f7;
}
.card-num {
  font-size: 18px;
  color: red;
  font-weight: bold;
}
.card-song {
  color: #666;
  font-size: 13px;
}
.card-sing {
  font-size: 12px;
  margin-right: 5px;
  font-size: 14px;
  color: #999;
}
.card-left > div {
  margin: 0 2px;
}
.card-left {
   display: flex;
  justify-content: space-around ;
}
.card-row:hover{
  background: #ebeced;
} 
.card-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  background: #fafafa;
  cursor: pointer;
  user-select: none;
}


.top-play {
  font-size: 20px;
  padding: 5px;
  color: #fff;
  position: absolute;
  bottom: 5%;
  left: 87%;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}
.card-time {
  position: absolute;
  bottom: 0;
  left: 20px;
  margin-bottom: 5px;
}
.top {
  position: relative;
  width: 100%;
  color: #fff;
}
.top-list-card {
  position: relative;
  width: 300px;
  margin-top: 20px;
}
</style>