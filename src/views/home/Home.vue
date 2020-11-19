<template>
  <div class="home">
		<right-top></right-top>


    <router-view></router-view>
  </div>
</template>

<script>
import  RightTop from '../right/RightTop'
export default {
	components: {
		RightTop
	}
};
</script>

<style scoped>
.home {
}
</style>