<template>
  <div class="right-list">
    <div class="rigth-content">
      <title-header
        name="官方版"
        style="margintop: 20px; width: 100%"
        :show="false"
      ></title-header>
      <top-list-card
        v-for="(item, index) in allMes"
        :key="index"
        :cards="item"
        :id="item.id"
        style="marginright: 20px"
      ></top-list-card>
      <title-header
      name="官方版"
      style="margintop: 20px; width: 100%"
      :show="false"
    ></title-header>
    </div>
    <div class="buttom">
      <MusicListItem
      v-for="(item, index) in globalList"
      :key="index"
      :item="item"
      style="margin-right: 10px"
    ></MusicListItem>
    </div>
   
   
  </div>
</template>

<script>
import { getTopList, getTopListDetial } from "network/toplist";
import TitleHeader from "components/common/titleheader/TitleHeader";
import TopListCard from "components/common/toplist/TopListCard";
import MusicListItem from "components/common/musiclist/MusicListItem";
export default {
  components: {
    TitleHeader,
    TopListCard,
    MusicListItem,
  },
  data() {
    return {
      allMes: [],
      soarings: {},
      newsongs: {},
      original: {},
      hotsong: {},
      raphotlist: {},
      raplist: {},
      globalList: [],
    };
  },
  methods: {
    getTopList() {
      getTopList().then((res) => {
        console.log(res.list);
        this.allMes = res.list.splice(0, 6);
        this.soarings = this.allMes[0];
        this.newsongs = this.allMes[1];
        this.original = this.allMes[2];
        this.hotsong = this.allMes[3];
        this.raplist = this.allMes[4];
        this.raphotlist = this.allMes[5];
        console.log(res.list);
        this.globalList = res.list;
        // console.log(this.globalList);
      });
    },
    getTopListDetial() {
      getTopListDetial().then((res) => {});
    },
  },
  created() {
    this.getTopList();
    this.getTopListDetial();
  },
};
</script>

<style scoped>
.right-list {
  width: 95%;
  max-height: 580px;
  margin: 0 auto;
  overflow: auto;
  padding-bottom: 40px;
}
.rigth-content {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.buttom{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
}
</style>