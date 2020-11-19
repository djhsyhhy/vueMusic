<template>
  <div class="anchorListMenu">
    <div class="top">
      <div class="img">
        <img :src="anchorMenus.picUrl" alt="404" />
      </div>
      <div class="menu">
        <div class="title">
          <span class="tol">电台</span>
          <span class="title-a">{{ anchorMenus.name }}</span>
        </div>
        <div class="name">
          <a href="#">
            <img :src="users.avatarUrl" alt="404" />
          </a>
          <a href="#" class="source">{{ users.nickname }}</a>
        </div>
        <div class="btn">
          <el-button size="mini" type="primary" icon="el-icon-video-play">
            播放全部
            <button class="btn-a">+</button>
          </el-button>
          <el-button
            size="small"
            icon="el-icon-star-off"
            @click="subscripe(songList.id)"
            >订阅({{ anchorMenus.subCount }})</el-button
          >
          <el-button size="small" icon="el-icon-thumb"
            >分享({{ anchorMenus.shareCount }})</el-button
          >
        </div>
        <div class="tag">
          <span class="ti">{{ anchorMenus.category }}</span>
          <span>{{ anchorMenus.rcmdText }}</span>
        </div>
        <div class="brief">
          <p>{{ users.signature }}</p>
          <p>{{ anchorMenus.desc }}</p>
        </div>
      </div>
      <div class="songstable" style="width:90%;marginTop:20px;">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="marginLeft:50px;">
        <el-tab-pane label="节目" name="first">
          <AnchorProgram :load="load" :numbers="count"></AnchorProgram>
        </el-tab-pane>
        <el-tab-pane :label="'订阅者('+anchorMenus.subCount+')'" name="third">
          <AnchorSubscr></AnchorSubscr>
        </el-tab-pane>
      </el-tabs>
    </div>
    </div>
    
  </div>
</template>

<script>
import { getAnchorDetail } from "network/anchor";
import AnchorProgram from "./AnchorProgram";
import AnchorSubscr from "./AnchorSubscr";
export default {
  components: {
    AnchorProgram,
    AnchorSubscr
  },
  data() {
    return {
      id: 0,
      ids: [],
      anchorMenus: {},
      users: {},
      activeName: "first",
      load: false,
      count: 0,
    };
  },
  methods: {
    getAnchorDetail(id) {
      getAnchorDetail(id).then((res) => {
        console.log(res);
        this.anchorMenus = res.data;
        this.users = res.data.dj;
      });
    },
  },
  created() {
    this.id = +this.$route.params.id;
    this.getAnchorDetail(this.id);
  },
};
</script>

<style scoped>
.brief {
    font-size: 14px;
  margin-top: 5px;
}
.brief p {
  margin-top: 13px;
  line-height: 1.4;
}
.ti {
  border: 1px solid #44aaf8;
  color: #44aaf8;
  padding: 2px;
  font-size: 12px;
}
.tag {
  margin-top: 15px;
}
.btn {
  margin-top: 15px;
}
.btn-a {
 background: #409eff;
  cursor: pointer;
  border: none;
  color: #fff;
}
.source {
  color: rgba(255, 0, 0, 0.7);
  margin-right: 8px;
}
.source:hover {
  color: red;
}
.name {
  margin-top: 15px;
}
.name img {
    border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  vertical-align: middle;
}
.title-a {
  font-size: 23px;
  font-weight: 10px;
}
.tol {
  background: red;
  font-size: 14px;
  color: #fff;
  padding: 2px 6px;
  margin-right: 7px;
}
.menu {
  display: flex;
  flex-direction: column;
  width: 70%;
}
.img img {
  width: 100%;
}
.img {
  width: 20%;
  margin: 0 20px;
}
.top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.anchorListMenu {
  display: flex;
  flex-wrap: wrap;
  max-height: 680px;
  overflow: auto;
  padding-top: 30px;
}
</style>