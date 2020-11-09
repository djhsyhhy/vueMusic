<template>
  <div class="leftmenu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>推荐</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-magic-stick"></i>发现音乐</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-news"></i>私人FM</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-video-camera-solid"></i>LOOK直播</el-menu-item
          >
          <el-menu-item index="1-4"
            ><i class="el-icon-video-camera"></i>视频</el-menu-item
          >
          <el-menu-item index="1-5">
            <i class="el-icon-s-custom"></i>朋友
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的音乐</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"
            ><i class="el-icon-bangzhu"></i>本地音乐</el-menu-item
          >
          <el-menu-item index="2-2">
            <i class="el-icon-download"></i>下载管理
          </el-menu-item>
          <el-menu-item index="2-3">
            <i class="el-icon-cloudy"></i>我的音乐云盘</el-menu-item
          >
          <el-menu-item index="2-4">
            <i class="el-icon-coin"></i>我的电台</el-menu-item
          >
          <el-menu-item index="2-5">
            <i class="el-icon-star-off"></i>我的收藏
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">
          <i></i>创建的歌单
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="'3-'+index"
            v-for="(item,index) in getUserSonglist"
            :key="item.id"
            class="song-list"
            @click="togSonglist(item.id)"
          >
            <i :class="[index === 0 ? 'el-icon-star-on' : 'el-icon-s-data']"></i>
            {{item.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getUserSonglist: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
</style>