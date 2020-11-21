<template>
  <div class="singerMenu">
    <div class="s-img">
      <img :src="singerMessage.picUrl" alt="404" />
      <div class="myself" @click="toMyself(singerMessage.accountId)">
        <i class="el-icon-user"></i>
        <span>个人主页</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="s-menu">
      <div class="title">
        <div>
          <span class="tol">歌手</span>
          <span class="title-a">{{ singerMessage.name }}</span>
        </div>
        <div class="like">
          <span @click="addLike(singerMessage.id)">
            <i :class="likeClass">{{ likeContent }}</i>
          </span>
        </div>
      </div>
      <div class="title-son" style="margintop: 30px">
        <span>
          <i class="el-icon-service" style="fontsize: 18px"></i>
          单曲数 : {{ singerMessage.musicSize }}
        </span>
      </div>
      <div class="title-son">
        <span>
          <i class="el-icon-film" style="fontsize: 18px"></i>
          专辑数 : {{ singerMessage.albumSize }}
        </span>
      </div>
      <div class="title-son">
        <span>
          <i class="el-icon-video-camera" style="fontsize: 18px"></i>
          MV数 : {{ singerMessage.mvSize }}
        </span>
      </div>
      <div class="title-son">
        <i class="el-icon-mic" style="fontsize: 18px"></i>
        <a href="#" class="showTime">演出数 : 1</a>
      </div>
    </div>
    <div class="songstable" style="width: 90%; margintop: 20px">
      <el-tabs
        v-model="activeName"
        style="marginleft: 50px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="专辑" name="first">
          <SingerAlbum :tableList="singerSongs"></SingerAlbum>
          <SingerAlbum
            :tableList="item.songs"
            v-for="(item, index) in albumAll"
            :key="index"
            style="margintop: 20px"
          >
            <img :src="item.album.picUrl" alt slot="albumImg" />
            <el-table-column
              type="index"
              width="120"
              :label="item.album.name"
              slot="albumTitle"
            ></el-table-column>
          </SingerAlbum>
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <div class="singer-mv">
            <SingerMvCard
              v-for="item in mvss"
              :key="item.id"
              :mvss="item"
            ></SingerMvCard>
          </div>
          <el-pagination
            background
            :page-size="limits"
            layout="prev, next"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="three">
          <SingerBrief :self="singerSelf" :contents="briefs"></SingerBrief>
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="four">
          <div class="singer-mv">
            <SingerMvCard
              v-for="item in simis"
              :key="item.id"
              :mvss="item"
              :mvright="false"
              :mvtime="false"
            ></SingerMvCard>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="演出" name="five">演出</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getSingerArt,
  getSingerAlbum,
  getSingerAlbumAll,
  getSingerMv,
  getSingerDesc,
  getSingerSimi,
} from "network/singer";
import SingerAlbum from "components/common/singerlist/SingerAlbum";
import SingerMvCard from "components/common/singerlist/SingerMvCard";
import SingerBrief from "components/common/singerlist/SingerBrief";
export default {
  components: {
    SingerAlbum,
    SingerMvCard,
    SingerBrief,
  },
  data() {
    return {
      id: 0,
      activeName: "first",
      count: 0,
      singerMessage: {},
      singerSongs: [],
      albumAll: [],
      mvss: [],
      briefs: [],
      singerSelf: "",
      end: true,
      offsets: 0,
      limits: 20,
      simis: [],
      liked: false,
      likeContent: "收藏",
      likeClass: "el-icon-first-aid-kit",
    };
  },
  methods: {
    addLike(id) {},
    handleClick(tab, event) {
      console.log(tab.name)
      switch (
        tab.name //这个地方可以做到按需加载
      ) {
        case "second":
          this.getSingerMv(this.id);
          break;
        case "three":
          this.getSingerDesc(this.id);
          break;
        case "four":
          this.getSingerSimi(this.id);
          break;
        default:
          this.getSingerArt(this.id);
      }
    },
    getSingerSimi(id) { //相似的歌手
      getSingerSimi(id).then((res) => {
        console.log(res);
        this.simis = res.artists;
      });
    },
    getSingerDesc(id) { //歌手简介
      getSingerDesc(id).then((res) => {
        console.log(res);
        this.singerSelf = res.briefDesc;
        this.briefs = res.introduction;
        this.briefs.forEach((item) => {
          //简单对数据处理 便于展示美观
          item.txt = item.txt
        });
        // console.log(this.singerSelf);
        // console.log(this.briefs);
      });
    },
    getSingerMv(id, limit, offset) { //mv
      getSingerMv(id, limit, offset).then((res) => {
        console.log(res.mvs);
        this.mvss = res.mvs;
      });
    },
    getSingerArt(id) {
      //获取数据
      getSingerArt(id).then((res) => {
        this.singerMessage = res.artist;
        this.singerSongs = res.hotSongs;
      });
    },
    getSingerAlbum(id) {
      //请求所有的
      getSingerAlbum(id).then((res) => {
        // console.log(res.hotAlbums);
        res.hotAlbums.map((item) => {
          this.getSingerAlbumAll(item.id); //每项请求分离
        });
      });
    },
    getSingerAlbumAll(id) {
      getSingerAlbumAll(id).then((res) => {
        // console.log(res);
        this.albumAll.push(res);
        // console.log(this.albumAll);
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getSingerArt(this.id);
    this.getSingerAlbum(this.id);
  },
  watch: {
    //这个是为了重复路由监测
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      console.log(to.params.id);
      this.id = parseInt(to.params.id);
      this.getSingerSimi(this.id);
      this.getSingerArt(this.id);
    },
  },
};
</script>

<style scoped>
.singerMenu {
  display: flex;
  flex-wrap: wrap;
  max-height: 630px;
  overflow: auto;
  padding-top: 30px;
}
.s-img {
  width: 20%;
  margin: 0 auto;
  position: relative;
}
.s-img img {
  width: 100%;
}
.myself {
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  font-size: 14px;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  cursor: pointer;
}
.myself:hover {
  background: rgba(0, 0, 0, 0.3);
}
.s-menu {
  width: 70%;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: space-between;
}
.tol {
  background: red;
  font-size: 14px;
  color: #fff;
  padding: 2px 6px;
  margin-right: 7px;
}
.title-a {
  margin-left: 10px;
  font-size: 20px;
}
.like {
  border: 1px solid #e1e1e2;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}
.title-son {
  margin-top: 10px;
}
.singer-mv {
  display: flex;
  flex-wrap: wrap;
}
</style>