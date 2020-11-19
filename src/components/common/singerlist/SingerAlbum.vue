<template>
  <div class="singer-album">

    <el-table>
          <slot name="albumTitle">
          <el-table-column type="index" width="90" :label="topTitle"></el-table-column>
        </slot>
        <el-table-column width="70">
          <slot name="tableicon" slot-scope="scope" :item='scope.row.album.picUrl ' v-if="images">
            <a href class="icon" @click.prevent.stop="addCollect">
              <i class="el-icon-star-off" v-if="isshow"></i>
              <i class="el-icon-star-on" v-else></i>
            </a>
            <a href="#" class="icon">
              <i class="el-icon-download"></i>
            </a>
          </slot>
        </el-table-column>
        <el-table-column prop="name" width="180"></el-table-column>
        <el-table-column prop="ar[0].name" width="100">
        </el-table-column>
        <el-table-column prop="al.name">
           <slot name="tablesinger" slot-scope="scope" :item='scope.row.album.artists' v-if="nicknameshow">
          </slot>
        </el-table-column>
        <el-table-column prop="dt" width="100">
          <span slot-scope="scope">{{scope.row.duration || scope.row.dt | singDate}}</span>
        </el-table-column>
      </el-table>


  </div>
</template>

<script>
import { getMusicUrl, getMusicMenu } from "network/home";
export default {
 name: "SingerAlbum",
  props: {
    tableList: {
      type: Array,
      default() {
        return [];
      },
    },
    wth: {
      type: Number,
      default: 70,
    },
    imgShow: {
      type: Boolean,
      default: true,
    },
    topTitle:{
      type:String,
      default:'热门50首'
    },
    images:{
        type:Boolean,
        default:false,
      },
    nicknameshow:{
        type:Boolean,
        default:false,
      },
  },
  data() {
    return {
      isshow: true,
      lookshow: true,
      showNum: 10,
    };
  },
}
</script>

<style scoped>

</style>