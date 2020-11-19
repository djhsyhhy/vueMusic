<template>
  <div class="right-top">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="taps">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.label"
        :name="item.name"
        class="tapbar"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "/home/rtstyle",
      tabs: [
        { label: "个性推荐", name: "/home/rtstyle" },
        { label: "歌单", name: "/home/rtsongs" },
        { label: "主播电台", name: "/home/rtanchor" },
        { label: "排行榜", name: "/home/rtlist" },
        { label: "歌手", name: "/home/rtsinger" },
        { label: "最新音乐", name: "/home/rtnewsing" },
      ],
    };
  },
  methods: {
    handleClick(tab, event, name) {
       this.$router.replace(tab.name);
      this.activeName = tab.name;
    },
  },
};
</script>

<style scoped>
.taps {
  display: flex;
  justify-content: center;
}
.tapbar {
  margin: 0 2px 0 2px;
}
</style>