import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./view/home/layout-footer.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        component: () => import('./view/home/index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    name: 'user',
    component: () => import('./view/home/layout-footer.vue'),
    meta: {
      title: '我的'
    },
    children: [
      {
        path: '',
        component: () => import('./view/user'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    name: 'userInfo',
    path: '/userInfo',
    component: () => import('./view/user/user.vue'),
    meta: {
      title: '商铺信息'
    }
  },
  {
    name: 'confirm',
    path: '/confirm',
    component: () => import('./view/goods/confirm.vue'),
    meta: {
      title: '确认订单'
    }
  },
  {
    name: 'coupon',
    path: '/coupon',
    component: () => import('./view/coupon/index.vue'),
    meta: {
      title: '商铺信息'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/home/layout-footer.vue'),
    meta: {
      title: '购物车'
    },
    children: [
      {
        path: '',
        component: () => import('./view/cart'),
        meta: {
          title: '购物车'
        }
      }
    ]
  },
  {
    name: 'address',
    redirect: '/address/index',
    component: () => import('./view/home/layout-header.vue'),
    meta: {
      title: '地址管理'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('./view/address'),
        meta: {
          title: '地址列表'
        }
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('./view/address/edit.vue'),
        meta: {
          title: '修改地址'
        }
      }
    ]
  },

  {
    name: 'goods',
    path: '/goods',
    redirect: 'goods',
    component: () => import('./view/home/layout-footer.vue'),
    meta: {
      title: '商品详情'
    },
    children: [
      {
        path: '', //  默认第一个不要写ptah，不然无法匹配
        component: () => import('./view/goods'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: 'detail', //  默认第一个不要写ptah，不然无法匹配
        component: () => import('./view/goods/detail.vue'),
        meta: {
          title: '商品详情'
        }
      }
    ]
  },
  {
    name: 'detail',
    // redirect: 'activities/index',
    component: () => import('./view/goods/detail.vue'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'activities',
    path: '/activities',
    redirect: 'activities',
    component: () => import('./view/home/layout-footer.vue'),
    meta: {
      title: '活动'
    },
    children: [
      {
        path: '',
        component: () => import('./view/activities'),
        meta: {
          title: '商品活动'
        }
      }
    ]
  },
  {
    name: 'order',
    component: () => import('./view/user/order.vue'),
    meta: {
      title: '订单'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export {
  router
}
