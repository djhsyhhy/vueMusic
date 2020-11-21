import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

const state = {
  musiclistId: [], //音乐的ID
  musicCount: 0, //总数
  nowmusic: '', //现在播放的
  nowmusicmenu: null, //现在播放音乐的所有属性
  musicmenus: [], //所有的音乐
  userPlayList: [], //播放的列表
  musicDuration: 0, //时间
  isPlaying: true, //播放状态

}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})