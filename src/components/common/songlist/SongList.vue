<template>
  <div class="song-list">
    <div class="s-img">
      <img :src="songList.coverImgUrl" alt="" />
    </div>
    <div class="s-menu">
      <div class="title">
        <div>
          <span class="tol">歌单</span>
          <span class="title-a">{{ songList.name }}</span>
        </div>
        <div class="r-nums">
          <div class="sums">
            歌曲数
            <p>{{ songList.trackCount }}</p>
          </div>
          <div class="plays">
            播放数
            <p>{{ (songList.playCount / 10000).toFixed(0) }}万</p>
          </div>
        </div>
      </div>
      <div class="time">
        <a href="#">
          <img :src="creators.avatarUrl" alt="404" />
        </a>
        <a href="#" class="source">{{ creators.nickname }}</a>
        <!--这地方少一个转化时间的 -->
        <span class="time-t">{{ songList.createTime | showDate }}创建</span>
      </div>
      <div class="btn">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-video-play"
          @click="playAll(songList.id)"
        >
          播放全部
          <button class="btn-a" @click.stop="subscripe(songList.id)">+</button>
        </el-button>
        <el-button
          size="small"
          icon="el-icon-star-off"
          @click="subscripe(songList.id)"
          >收藏({{ songList.subscribedCount }})</el-button
        >
        <el-button size="small" icon="el-icon-thumb"
          >分享({{ songList.shareCount }})</el-button
        >
        <el-button size="small" icon="el-icon-download">下载全部</el-button>
      </div>
      <div class="tag">
        <span>标签:</span>
        <a href="#" v-for="(item, index) in songList.tags" :key="index">{{
          index + 1 === songList.tags.length ? item : item + " / "
        }}</a>
      </div>
      <div class="brief">
        <span style="marginright: 8px">简介:</span>
        <span style="lineheight: 1.5">{{
          (songList.description + "").substr(0, 200) + "..."
        }}</span>
      </div>
    </div>
    <div class="songstable" style="width: 90%; margintop: 20px">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="marginleft: 50px"
      >
        <el-tab-pane label="歌曲列表" name="first">
          <SongTable :load="load" :numbers="count"></SongTable>
        </el-tab-pane>
        <el-tab-pane :label="gettalk" name="second">
          <SongComment></SongComment>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <SongCollect></SongCollect>
        </el-tab-pane>
      </el-tabs>
      <div class="find" style="width: 180px; height: 40px">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          size="mini"
          suffix-icon="el-icon-search"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import SongTable from "./SongTable";
import SongCollect from "./SongCollect";
import SongComment from "./SongComment";
import { formatDate } from "common/uctil";
import { getSongListInfo } from "network/home"; //根据id获得表单。
export default {
  components: {
    SongTable,
    SongCollect,
    SongComment,
  },
  data() {
    return {
      id: 0,
      ids: [],
      songList: {},
      creators: {},
      activeName: "first",
      input: "",
      load: false,
      count: 0,
    };
  },
    computed: {
    //获取评论数
    gettalk() {
      return `评论(${this.songList.commentCount})`;
    },
    getnums() {
      return this.songList.trackCount;
    },
  },
  methods: {
    playAll(id) {

    },
    getSongListInfo(id) {
      //获得数据
      getSongListInfo(id).then((res) => {
        console.log(res)
        this.songList = res.playlist;
        this.creators = res.playlist.creator;
        //遍历数组把得到歌曲id放到一个数据里面
        this.songList.trackIds.forEach((item) => {
          this.ids.push(item.id);
          this.count = this.songList.trackCount;
        });
        // console.log(this.songList);
        // this.currentSongList = { ...res};
      });
    },
    handleClick() {},
  },
  created() {
    this.id = this.$route.params.id;
    this.getSongListInfo(this.id);
  },
  filters: {
    //日期过滤
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.songstable {
  position: relative;
}
.find {
  position: absolute;
  top: 0px;
  right: 0;
}
.brief {
  margin-top: 10px;
  margin-left: 2px;
}

.tag {
  margin-top: 15px;
  font-size: 13px;
}
.tag span {
  margin-right: 8px;
}
.tag a {
  color: #0c73c2;
}
.btn {
  margin-left: 2px;
  margin-top: 10px;
}
.btn-a {
  background: #409eff;
  cursor: pointer;
  border: none;
  color: #fff;
}
.time {
  margin-top: 15px;
}
.time img {
  border-radius: 50%;
  width: 28px;
  margin-right: 8px;
  vertical-align: middle;
}
.source {
  margin-left: 2px;
  color: rgb(65, 38, 38);
}
.source:hover {
  color: blue;
}
.time-t {
  font-size: 13px;
  color: #333;
}
.r-nums {
  display: flex;
  color: rgb(82, 72, 72);
}
.sums {
  border-right: 1px solid #ccc;
  padding-right: 8px;
  position: relative;
}
.plays {
  position: relative;
  padding-left: 15px;
}
.title-a {
  font-size: 23px;
  font-weight: 10px;
}
.tol {
  border: 1px solid red;
  font-size: 14px;
  color: red;
  padding: 2px;
  margin-right: 7px;
}
.title {
  display: flex;
  justify-content: space-between;
}
.s-menu {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 75%;
}
.s-img img {
  width: 100%;
}
.s-img {
  width: 20%;
}
.song-list {
  display: flex;
  flex-wrap: wrap;
  max-height: 680px;
  overflow: auto;
  padding-top: 30px;
}
</style>