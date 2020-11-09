export default {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home/rtstyle',
    },
    {
      path: '/home',
      component: () => import('@/views/home/Home'),
      meta: {index: 7},
      children: [
        {
          path: 'rtstyle',
          name: 'style',
          component: () => import('../views//right/menu/RightStyle'),
          meta: {index: 7},
        },
        
      ]
    }

  ]
}