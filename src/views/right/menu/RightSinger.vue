<template>
  <div class="right-singer">
    <div class="title-top">
    <title-box :titles='titleOne'></title-box>
    <title-box :titles='titleTwo'></title-box>
    <title-box :titles='titleThree'></title-box>
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
          console.log(res.artists);
          this.singerAll = res.artists;
        });
      }
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