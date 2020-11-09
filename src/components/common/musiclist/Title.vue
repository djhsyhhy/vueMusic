<template>
  <div class="title">
    <div class="left">{{ name }}</div>
    <div class="right" v-if="show">
      <a @click.prevent="toggel" href=""
        >{{ more }}<i class="el-icon-arrow-right"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    name: {
      type: String,
      default: "推荐",
    },
    more: {
      type: String,
      default: "更多",
    },
    path: {
      type: String,
      default: "/home/rtsongs",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggel() {},
  },
};
</script>

<style scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color: #333;
  margin: 2px 40px 2px 40px;
}
.left {
  font-size: 20px;
}
.right {
  font-size: 12px;
}
</style>