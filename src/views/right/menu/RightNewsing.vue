<template>
  <div class="right-new-sing">
    <div class="top-button">
      <div class="button">
        <el-button size="small" round :class="isTog ? 'active ' : ''"
          >新歌速递</el-button
        >
        <el-button size="small" round :class="isTog ? ' ' : 'active'"
          >新歌上架</el-button
        >
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <SingerAlbum
          :wth="wth"
          :imgShow="false"
          :tableList="songsList"
          topTitle="热门歌曲"
          :images="true"
          :nicknameshow="true"
          v-show="togShow"
        ></SingerAlbum>
      </el-tab-pane>
      <el-tab-pane label="华语" name="second"
        ><SingerAlbum
          :wth="wth"
          :imgShow="false"
          :tableList="huayuList"
          topTitle="华语"
          :images="true"
          :nicknameshow="true"
          v-show="togShow"
        ></SingerAlbum
      ></el-tab-pane>
      <el-tab-pane label="欧美" name="third">
        <SingerAlbum
          :wth="wth"
          :imgShow="false"
          :tableList="oulist"
          topTitle="欧美"
          :images="true"
          :nicknameshow="true"
          v-show="togShow"
        ></SingerAlbum>
      </el-tab-pane>
      <el-tab-pane label="韩国" name="fourth"
        ><SingerAlbum
          :wth="wth"
          :imgShow="false"
          :tableList="hanlist"
          topTitle="涵果"
          :images="true"
          :nicknameshow="true"
          v-show="togShow"
        ></SingerAlbum
      ></el-tab-pane>
      <el-tab-pane label="日本" name="five">
        <SingerAlbum
          :wth="wth"
          :imgShow="false"
          :tableList="rilist"
          topTitle="日本"
          :images="true"
          :nicknameshow="true"
          v-show="togShow"
        ></SingerAlbum>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getNewSongs, getNewAlbum } from "network/newSongs";
import SingerAlbum from "../../../components/common/singerlist/SingerAlbum";
export default {
  components: {
    SingerAlbum,
  },
  data() {
    return {
      isTog: true,
      activeName: "first",
      songsList: [],
      huayuList: [],
      oulist: [],
      rilist: [],
      hanlist: [],
      albumList: [],
      huayualbum: [],
      oualbum: [],
      rialbum: [],
      hanalbum: [],
      togShow: true,
      wth: 95,
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.name);
      if (this.togShow) {
        switch (tab.name) {
          case "second":
            this.getNewSongs(7);
            break;
          case "third":
            this.getNewSongs(96);
            break;
          case "fourth":
            this.getNewSongs(8);
            break;
          case "five":
            this.getNewSongs(16);
            break;
          default:
            this.getNewSongs(0);
        }
      } else {
        switch (tab.name) {
          case "second":
            this.getNewAlbum("ZH");
            break;
          case "third":
            this.getNewAlbum("EA");
            break;
          case "fourth":
            this.getNewAlbum("KR");
            break;
          case "five":
            this.getNewAlbum("JP");
            break;
          default:
            this.getNewAlbum("ALL");
        }
      }
    },
    getNewSongs(type) {
      getNewSongs(type).then((res) => {
        // console.log(res.data);
        switch (type) {
          case 7:
            this.huayuList = res.data;
            break;
          case 96:
            this.oulist = res.data;
            break;
          case 8:
            this.rilist = res.data;
            break;
          case 16:
            this.hanlist = res.data;
            break;
          default:
            this.songsList = res.data;
        }
      });
    },
    getNewAlbum(area) {
      getNewAlbum(area).then((res) => {
        console.log(res);
        this.albumList = res.albums;
        switch (area) {
          case "ZH":
            this.huayualbum = res.albums;
            break;
          case "EA":
            this.oualbum = res.albums;
            break;
          case "KR":
            this.rialbum = res.albums;
            break;
          case "JP":
            this.hanalbum = res.albums;
            break;
          default:
            this.albumList = res.albums;
        }
      });
    },
  },
  created() {
    this.getNewSongs();
    this.getNewAlbum("ALL");
  },
};
</script>

<style scoped>
.top-button {
  width: 100%;
  display: flex;
  justify-content: center;
}
.active {
  background-color: aqua;
}
</style>