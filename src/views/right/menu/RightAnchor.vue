<template>
  <div class="right-anchor">
    <swiper-anchor :swipers="banners"></swiper-anchor>
    
    <title-icon></title-icon>

    <div class="center">
      <TitleHeader name="精选电台" style="margin: 0 auto" path="/hotAnchor">
      </TitleHeader>
      <Card
        v-for="(item, index) in recommends"
        :key="index"
        :item="item"
        :wth="23"
      >
      </Card>
      <TitleHeader name="付费精选" style="margintop: 50px" path="/payAnchor">
      </TitleHeader>
      <PayCard v-for="item in pays" :key="item.id" :item="item"> </PayCard>
      <TitleHeader name="电台个性推荐" style="margintop: 50px" :show="false">
      </TitleHeader>
      <Card
        v-for="item in recommend"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text">{{ item.name }}</div>
      </Card>
      <TitleHeader name="创作|翻唱" style="margintop: 50px" path="/anchor2001">
      </TitleHeader>
      <Card
        v-for="item in creations"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text">{{ item.name }}</div>
      </Card>
      <TitleHeader name="3D|电子" style="margintop: 50px" path="/anchor10002">
      </TitleHeader>
      <Card
        v-for="item in electrs"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text">{{ item.name }}</div>
      </Card>
      <TitleHeader name="音乐故事" style="margintop: 50px" path="/anchor2">
      </TitleHeader>
      <Card
        v-for="item in musicStory"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text">{{ item.name }}</div>
      </Card>
      <TitleHeader name="情感调频" style="margintop: 50px" path="/anchor3">
      </TitleHeader>
      <Card
        v-for="item in emotion"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text">{{ item.name }}</div>
      </Card>
      <TitleHeader name="二次元" style="margintop: 50px" path="/anchor3001">
      </TitleHeader>
      <Card
        v-for="item in quadratic"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text">{{ item.name }}</div>
      </Card>
    </div>
  </div>
</template>

<script>
import {
  getAnchorBanner,
  getAnchorRecommend,
  getAnchorPay,
  getAnchorCateList,
  getAnchorType,
} from "network/anchor";

import SwiperAnchor from "components/common/swiper/SwiperAnchor";
import TitleIcon from "components/common/anchor/TitleIcon";
import PayCard from "components/common/anchor/PayCard";
import TitleHeader from "components/common/titleheader/TitleHeader";
import Card from "components/common/anchor/Card";
export default {
  components: {
    SwiperAnchor,
    TitleIcon,
    TitleHeader,
    Card,
    PayCard,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      recommend: [],
      pays: [],
      cate: [],
      creations: [],
      electrs: [],
      musicStory: [],
      emotion: [],
      quadratic: [],
    };
  },
  methods: {
    //轮播图
    getAnchorBanner() {
      getAnchorBanner().then((res) => {
        //  console.log(res.data);
        this.banners = res.data;
        //  console.log(this.banners);
      });
    },
    //精选电台
    getAnchorRecommend() {
      getAnchorRecommend().then((res) => {
        //  console.log(res);
         console.log(res.djRadios);
        this.recommends = res.djRadios;
        const arr = [...this.recommends];
        this.recommends = this.recommends.splice(0, 4);
        arr.splice(0, 4);
        this.recommend = [...arr];
        //  console.log(this.recommends);
      });
    },
    //付费
    getAnchorPay() {
      getAnchorPay().then((res) => {
        //  console.log(res);
        this.pays = res.data.list;
      });
    },
    //分类
    getAnchorCateList() {
      getAnchorCateList().then((res) => {
        //  console.log(res.categories);
        //获取分类名和id
        res.categories.map((item) => {
          this.cate.push({ name: item.name, id: item.id });
        });
        //  this.cate.push({name:res.name,id:res.id})
        // console.log(this.cate);
      });
    },
    // 以下都是不同分类的数据
    getCreation(id) {  //创作翻唱
      getAnchorType(id).then((res) => {
        //  console.log(res.djRadios);
        this.creations = res.djRadios.splice(0, 6);
        // console.log(this.creations);
      });
    },
    getElectr(id) { //3D 电子
      getAnchorType(id).then((res) => { 
        //  console.log(res.djRadios); 
        this.electrs = res.djRadios.splice(0, 6);
      });
    },
    getMusicStory(id) { //音乐故事
      getAnchorType(id).then((res) => {
        //  console.log(res.djRadios);
        this.musicStory = res.djRadios.splice(0, 6);
        // console.log(this.musicStory);
      });
    },
    getEmotion(id) { //情感调频
      getAnchorType(id).then((res) => {
        //  console.log(res.djRadios);
        this.emotion = res.djRadios.splice(0, 6);
        // console.log(this.musicStory);
      });
    }, 
    getQuadratic(id) { //二次元
      getAnchorType(id).then((res) => {
        //  console.log(res.djRadios);
        this.quadratic = res.djRadios.splice(0, 6);
        // console.log(this.musicStory);
      });
    },
  },
  created() {
    this.getAnchorBanner();
    this.getAnchorRecommend();
    this.getAnchorPay();
    this.getAnchorCateList();
    this.getCreation(2001); //创作翻唱id 可在cate中查看
    this.getElectr(10002);
    this.getMusicStory(2);
    this.getEmotion(3);
    this.getQuadratic(3001);
    //直接给数据
  },
};
</script>

<style scoped>
.slot-text {
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right-anchor {
  width: 95%;
  max-height: 590px;
  overflow: auto;
  margin: 0 auto;
  padding-bottom: 30px;
}
.center {
  width: 85%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>