<template>
  <div class="right-top">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="taps">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.label"
        :name="item.name"
        class="tapbar"
        @hdhead='hdhead'
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
  mounted() {
    this.activeName = this.$route.path //这个解决了tap位置不对的问题
  },
  methods: {
    handleClick(tab, event, name) {
       this.$router.replace(tab.name);
      this.activeName = tab.name;
    },
    hdhead(path) {
      console.log('a')
      this.activeName = path
    } 
    // beforeUnload() {
    //    window.addEventListener("beforeunload", () => {
    //     // visitedViews数据结构太复杂无法直接JSON.stringify处理，先转换需要的数据
    //     let tabViews = this.visitedViews.map(item => {
    //       return {
    //         fullPath: item.fullPath,
    //         hash: item.hash,
    //         meta: { ...item.meta },
    //         name: item.name,
    //         params: { ...item.params },
    //         path: item.path,
    //         query: { ...item.query },
    //         title: item.title
    //       };
    //     });
    //     sessionStorage.setItem("tabViews", JSON.stringify(tabViews));
    //   });
    //   // 页面初始化加载判断缓存中是否有数据
    //   let oldViews = JSON.parse(sessionStorage.getItem("tabViews")) || [];
    //   if (oldViews.length > 0) {
    //     this.$store.state.tagsView.visitedViews = oldViews;
    //   }
    // }
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