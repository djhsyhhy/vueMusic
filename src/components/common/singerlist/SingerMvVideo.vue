<template>
  <div class="mvvideo" ref="scroll">
    <div class="mv-left">
      <div>
        <a href="#">
          <i class="el-icon-arrow-left"></i>
        </a>
        <span class="mv-title">MV</span>
        <span style="fontsize: 16px; marginright: 5px">{{ topMenu.name }}</span>
        <span style="fontsize: 13px" v-if="topMenu.artists.length > 0">{{
          topMenu.artists[0].name
        }}</span>
        <span style="fontsize: 13px" v-if="topMenu.artists.length > 1"
          >{{ topMenu.artists[0].name }}/{{ topMenu.artists[1].name }}</span
        >
      </div>
      <video
        controls
        autoplay
        muted
        loop
        style="width: 99%; margin: 20px 0"
        id="myvideo"
        :src="videurl"
      ></video>
      <el-button size="small" icon="el-icon-thumb"
        >赞({{ likeCom.likedCount }})</el-button
      >
      <el-button size="small" icon="el-icon-star-off" @click="subscripe(12)"
        >收藏({{ topMenu.subCount }})</el-button
      >
      <el-button size="small" icon="el-icon-share"
        >分享({{ topMenu.shareCount }})</el-button
      >
      <el-button size="small" icon="el-icon-download">下载MV</el-button>
      <a
        href="#"
        style="
          color: #888;
          fontsize: 13px;
          textdecoration: underline;
          float: right;
          marginright: 5px;
        "
        >举报</a
      >
      <TitleHeader
        :name="'评论(' + likeCom.commentCount + ')'"
        :show="false"
        style="margintop: 50px"
      ></TitleHeader>
      <MvComment :comments="comments"></MvComment>
      <el-pagination
        background
        :page-size="limits"
        layout="prev, next"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="mv-right">
      <TitleHeader
        name="Mv介绍"
        :show="false"
        style="marginbottom: 8px"
      ></TitleHeader>
      <div style="display: flex; justifycontent: space-between">
        <span style="fontsize: 13px; color: #888"
          >发布时间:{{ topMenu.publishTime }}</span
        >
        <span style="fontsize: 13px; color: #888"
          >播放次数:{{
            topMenu.playCount > 1000
              ? (topMenu.playCount / 10000).toFixed(0) + "万"
              : topMenu.playCount
          }}次</span
        >
      </div>
      <div style="margintop: 8px">
        <span style="fontsize: 13px; color: #888; lineheight: 1.4">{{
          topMenu.desc
        }}</span>
      </div>
      <TitleHeader
        name="相关推荐"
        :show="false"
        style="margintop: 50px"
      ></TitleHeader>
      <MvSimiCard
        v-for="item in simiMvs"
        :key="item.id"
        :simis="item"
      ></MvSimiCard>
    </div>
  </div>
</template>

<script>
import {
  getMvUrl,
  getMvDetail,
  getMvDetailInfo,
  getMvComment,
  getMvSimi,
} from "network/singer";
import TitleHeader from "components/common/titleheader/TitleHeader";
import MvComment from "components/common/singerlist/MvComment";
import MvSimiCard from "components/common/singerlist/MvSimiCard";
export default {
  components: {
    TitleHeader,
    MvComment,
    MvSimiCard
  },
  data() {
    return {
      id: 0,
      videurl: '',
      topMenu: {},
      likeCom: {},
      comments: [],
      simiMvs: [],
      limit: 25,
      offsets :0

    }
  },
  methods: {
    handleCurrentChange(newPage) {
      //   console.log(newPage);
      this.offsets = (newPage - 1) * this.limits;
      this.getMvComment(this.id, this.limits, this.offsets);
      //回到合适位置
      this.$refs.scroll.scrollTop = 530;
    },
    getMvUrl(id) { //mv的地址
      getMvUrl(id).then(res => {
        // console.log(res);
        this.videurl = res.data.url
      })
    },
    getMvDetail(id) { //各种乱七八糟的信息
      getMvDetail(id).then(res => {
        // console.log(res);
        this.topMenu = res.data;
      })
    },
    getMvDetailInfo(id) { //各种乱七八糟的信息
      getMvDetailInfo(id).then(res => {
        // console.log(res);
        this.likeCom = res;
      })
    },
    getMvComment(id, limit, offset) {
      getMvComment(id, limit, offset).then(res => {
        // console.log(res);
        if (offset > 0) { //不同的加载按需加载 这个通过监听来实现
          this.comments = res.comments;
        } else {
          // console.log(res);
          this.comments = [...res.hotComments, ...res.comments];
        }
      })
    },
    getMvSimi(id) {
      getMvSimi(id).then((res) => {
        // console.log(res);
        this.simiMvs = res.mvs;
      });
    },
  },
  created() {
    this.id = this.$route.params.id
    this.getMvUrl(this.id);
    this.getMvDetail(this.id);
    this.getMvDetailInfo(this.id);
    this.getMvComment(this.id);
    this.getMvSimi(this.id);
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function (to, from) {
      // 拿到目标参数 to.params.id 去再次请求数据接口
      console.log(to.params.id);
      this.id = parseInt(to.params.id);
      this.getMvUrl(this.id);
      this.getMvDetail(this.id);
      this.getMvDetailInfo(this.id);
      this.getMvComment(this.id);
      this.getMvSimi(this.id);
    },
  },
  
};
</script>

<style scoped>
.mv-title {
  border: 1px solid red;
  padding: 3px 4px;
  font-size: 13px;
  color: red;
  margin: 0 5px;
}
.mvvideo {
  width: 93%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 0 auto;
  max-height: 630px;
  overflow: auto;
}
.mv-left {
  width: 62%;
}
.mv-right {
  width: 32%;
}
</style>