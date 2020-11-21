<template>
  <div class="right-singer">
    <div class="title-top">
    <title-box :titles='titleOne' @changeClass='changeOne'></title-box>
    <title-box :titles='titleTwo' @changeClass='changeTwo'></title-box>
    <title-box :titles='titleThree' @changeClass='changeThree'></title-box>
    </div>
    <div class="title">
      <SingerCard v-for="(item, index) in singerAll" :key="index" :item='item'></SingerCard>
    </div>
  </div>
</template>

<script>
import {getSinger} from "network/singer"; //歌手的信息
import TitleBox from 'components/common/singerlist/TitleBox'
import SingerCard from "components/common/singerlist/SingerCard";
export default {
data() {
    return {
       titleOne: ["华语", "欧美", "日本", "韩国", "其他"],
      titleTwo: ["全部", "男歌手", "女歌手", "乐队组合"],
      titleThree: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      singerAll: [],
      id1: -1,
      id2: -1,
      id3: -1,
      limit: 30,
    }
  },
  components: {
    TitleBox,
    SingerCard
  },
  methods: {
      getSinger(area, type, initial, limit) { 
        console.log('as')
        getSinger(area, type, initial, limit).then((res) => {
          this.singerAll = res.artists;
        });
      },
      changeOne(name) {
      switch (name) {
        case "欧美":
          this.id1 = 96;
          break;
        case "华语":
          this.id1 = 7;
          break;
        case "日本":
          this.id1 = 8;
          break;
        case "韩国":
          this.id1 = 16;
          break;
        case "其他":
          this.id1 = 0;
          break;
        default:
          this.id1 = -1;
      }
      this.getSinger(this.id1, this.id2, this.id3);
      },
    changeTwo(name) {
      console.log(name);
      this.limit = 30;
      switch (name) {
        case "男歌手":
          this.id2 = 1;
          break;
        case "女歌手":
          this.id2 = 2;
          break;
        case "乐队组合":
          this.id2 = 3;
          break;
        default:
          this.id2 = -1;
      }
      this.getSinger(this.id1, this.id2, this.id3);
    },
    changeThree(name) {
      // console.log(name);
      // console.log(name.toLowerCase());
      this.limit = 30;
      switch (name) {
        case "#":
          this.id3 = 0;
          break;
        case "热门":
          this.id3 = -1;
          break;
        default:
          this.id3 = name.toLowerCase();
      }
      this.getSinger(this.id1, this.id2, this.id3);
    },
  },
  created() {
    this.getSinger(-1, -1, -1)
  },
}
</script>

<style scoped>
.title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.title-top {
  margin: 0 auto;
  width: 90%;
}
.right-singer {
  width: 100%;
  max-height: 600px;
  overflow: auto;
  padding-bottom: 20px;
}
</style>