
const home = {
  path: '/home',
  component: () => import('@/views/home/Home'),
  meta: {index: 7},
  children: [
    {
      path: 'rtstyle', //主页面，推荐
      name: 'style',
      component: () => import('@/views/right/menu/RightStyle'),
      meta:{index:7}
  },
  {
      path: 'rtsongs',//歌单
      name: 'songs',
      component: () => import('@/views/right/menu/RightSongs'),
      meta:{index:8}
  },
  {
      path: 'rtanchor',//电台
      name: 'anchor',
      component: () => import('@/views/right/menu/RightAnchor'),
      meta:{index:9}
  },
  {
      path: 'rtlist', //排行榜
      name: 'list',
      component: () => import('@/views/right/menu/RightList'),
      meta:{index:10}
  },
  {
      path: 'rtnewsing', //最新音乐
      name: 'newsing',
      component: () => import('@/views/right/menu/RightNewsing'),
      meta:{index:11}
  },
  {
      path: 'rtsinger', //歌手
      name: 'singer',
      component: () => import('@/views/right/menu/RightSinger'),
      meta:{index:12}
  },
    
  ]
}

export default {
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      redirect: '/home/rtstyle',
    },
    home,
    {
      path: '/songs:id',  //播放的页面点击
      name: 'songslist',
      component: () => import('components/common/songlist/SongList'),
      meta:{index:2}
    },
    {
      path: '/singel', //buttom上的播放的页面
      name: 'singel',
      component: () => import('components/common/singel/Singel'),
      meta:{index:0}
    },
    {
      path: '/search:keywords', //搜索组件
      name: 'search',
      component: () => import('components/common/search/SearchMain'),
      meta:{index:2}
    },
    {
      path: '/anchor:id', //电台上的第一个title-top组件
      name: 'anchorlist',
      component: () => import('components/common/anchor/AnchorList'),
      meta:{index:2}
    },
    {
      path: '/listAnchor:id', //电台上的第一个title-top组件上的付费
      name: 'anchorList',
      component: () => import('components/common/anchorlist/AnchorListMenu'),
      meta:{index:2}
  },
  {
    path: '/hotAnchor',
    name: 'anchorHot',
    component: () => import('components/common/anchor/AnchorListHot'),
    meta:{index:2}
},

    

  ]
}