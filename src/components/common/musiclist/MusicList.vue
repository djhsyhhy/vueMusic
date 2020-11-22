<template>
  <div class="music-list">
    <Title></Title>
    <music-list-item
      v-for="(item, index) in musiclist"
      :key="index"
      :item="item"
    ></music-list-item>
  </div>
</template>

<script>
import Title from "./Title";
import MusicListItem from "./MusicListItem";

import { getMusicList } from "network/home";
export default {
  data() {
    return {
      musiclist: [],
    };
  },
  components: {
    Title,
    MusicListItem,
  },
  methods: {
    getMusicList() {
      getMusicList().then((res) => {
        // console.log(res)
        this.musiclist = res.playlists.slice(0, 10);
      });
    },
  },
  created() {
    this.getMusicList();
  },
};
</script>

<style scoped>
.music-list {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>