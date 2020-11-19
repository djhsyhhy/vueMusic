<template>
  <div class="anchorList">
    <h2 style="fontSize:19px;margin:10px 0 30px 0"> {{category}} </h2>
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
      <el-tab-pane label="推荐" name="second">
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
import { getAnchorHot } from "network/anchor";
export default {
  components: {
    PayCard
  },
  data() {
    return {
      id: 0,
      limit: 100,
      activeName: "first",
      pays: [],
      types: [],
      typess: [],
      category: '',
    }
  },
  methods: {
    getAnchorHot(id, limit){ //
      getAnchorHot(id, limit).then(res => {
        this.types = res.djRadios.splice(0, 50);
        this.typess = res.djRadios;
        this.category = res.djRadios[0].category; //标题
      })
    },

  },
  created() {
    this.id = this.$route.params.id
    this.getAnchorHot(this.id, this.limit)
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