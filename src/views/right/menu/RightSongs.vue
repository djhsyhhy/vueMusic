<template>
  <div class="right-songs" ref="scoll">
    <el-select
      v-model="value"
      placeholder="音乐"
      @change="changeMusicListCatTop"
    >
      <el-option
        v-for="item in catt"
        :key="item.id"
        :label="item.name"
        :value="item.name"
      >
      </el-option>
    </el-select>

    <div class="title">
      <span>热门标签：</span>
      <span
        class="titles"
        v-for="(item, index) in catlist"
        :key="index"
        :class="[curIndex == index ? 'active' : '']"
        @click="changeMusicListCat(item.name, index)"
        style="cursor: pointer"
        >{{ item.name }}
        <i style="paddingleft: 8px; color: #666">{{
          index === catlist.length - 1 ? " " : "|"
        }}</i></span
      >
    </div>

    <div class="songlist">
      <music-list-item
        v-for="(item, index) in songsList"
        :key="index"
        :item="item"
      ></music-list-item>
    </div>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total='totals'
        :page-size='limit'
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getSongListCatlist, getSongList } from "network/songs";
import MusicListItem from "components/common/musiclist/MusicListItem";
export default {
  components: {
    MusicListItem,
  },
  data() {
    return {
      value: "",
      catlist: [],
      catt: [],
      songsList: [],
      totals: [],
      limit: 30,
      offset: 0,
      cat: "全部",
      curIndex: 0,
    };
  },
  methods: {
    changeMusicListCatTop(name) {
      //这个地方有一个bug 就是这里转化的时候无法改变curIndex所以和下面有冲突
      this.cat = name;
      this.getSongList(this.cat, this.limit, this.offset);
    },
    handleCurrentChange(newPage) {
      //切换页码的时候进行触发的
      this.offset = (newPage - 1) * this.limit;
      this.getSongList(this.name, this.limit, this.offset);
      this.$refs.scoll.scrollTop = 0; //回到顶部
    },
    changeMusicListCat(name, index) {
      //改变标签的时候重新获取数据   name 是 标签的名字， index 是第几个  这个是为了样式
      this.curIndex = index;
      this.cat = name;
      this.getSongList(this.cat, this.limit, this.offset);
    },
    getSongListCatlist() {
      //获得类别选项
      getSongListCatlist().then((res) => {
        this.catlist = res.tags.splice(0, 10);
        const arr = [...this.catlist];
        this.catt = arr.splice(0, 5);
      });
    },
    getSongList(cat, limit, offset) {
      //获得某个类别的音乐
      getSongList(cat, limit, offset).then((res) => {
        this.songsList = res.playlists;
        this.totals = res.total;
      });
    },
  },
  created() {
    this.getSongListCatlist();
    this.getSongList(this.cat, this.limit, this.offset);
  },
};
</script>

<style>
.block {
  display: flex;
  justify-content: center;
}
.songlist {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.active {
  color: red;
}
.title {
  font-size: 13px;
  margin-top: 8px;
}
.title span {
  margin: 0 8px;
}
</style>