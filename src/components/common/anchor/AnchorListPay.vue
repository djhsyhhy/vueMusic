<template>
  <div class="anchorListHot">
    <h2>{{category}}</h2>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="热门" name="first">
        <div class="content">
          <PayCard
            v-for="item in types"
            :key="item.id"
            :item="item"
            :timeShow="false"
            :priceShow="false"
          >
          <p slot="count">节目：{{item.programCount}}，订阅：{{item.subCount}}</p>
          </PayCard>
        </div>
      </el-tab-pane>
      <el-tab-pane label="精选" name="second">
         <div class="content">
          <PayCard
            v-for="item in typess"
            :key="item.id"
            :item="item"
            :timeShow="false"
            :priceShow="false"
          >
          <p slot="count">节目：{{item.programCount}}，订阅：{{item.subCount}}</p>
          </PayCard>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PayCard from "components/common/anchor/PayCard";
import { getAnchorPay } from "network/anchor";
export default {
  components: {
    PayCard
  },
  data() {
    return {
      activeName: "first",
      pays: [],
      id: 0,
      types: [],
      typess: [],
      category:'付费精品',
      li: 60
    }
  },
  methods: {
    //精选电台热门数据
   getAnchorPay(li) {
     getAnchorPay(li).then((res) => {
        //  console.log(res.toplist);
        this.types = res.data.list.slice(0,30);
        // console.log(this.types);
      });
      //最新
      getAnchorPay(li).then((res) => {
        //  console.log(res.toplist);
        this.typess = res.data.list.slice(31);
        // console.log(this.types);
      });
    },
  },
  created() {
    this.getAnchorPay(this.li)
  },
}
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.anchorList {
  width: 95%;
  max-height: 630px;
  overflow: auto;
  margin: 0 auto;
  margin-top: 30px;
  padding: 0 30px;
  padding-bottom: 30px;
}
</style>