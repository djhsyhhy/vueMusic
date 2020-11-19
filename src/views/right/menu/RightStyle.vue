<template>
  <div class="rt-style">
    <swiper></swiper>
    <music-list></music-list>
  </div>
</template>

<script>
import Swiper from 'components/common//swiper/Swiper'
import MusicList from 'components/common/musiclist/MusicList'
export default {
  components: {
    Swiper,
    MusicList
  }
}
</script>

<style scoped>
.rt-style {
  width: 100%;
  max-height: 600px;
  overflow-y: scroll ;
}
</style>