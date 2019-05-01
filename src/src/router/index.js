import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: '登录页面',
    hidden: true,
    component: resolve => require(['../views/login/Login.vue'], resolve)
  },
  {
    path: '/Dashboard',
    index: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'el-icon-menu'
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/',
        component: resolve => require(['../components/page/firstpage/Dashboard.vue'], resolve)
      }
    ]
  },
  {
    path: '/pd',
    meta: {
      title: '个人中心',
      icon: 'el-icon-setting'
      // roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/pd',
        meta: {
          title: '', icon: 'el-icon-menu'
          // roles: ['admin']
        },
        component: resolve => require(['../components/page/firstpage/PersonalData.vue'], resolve)
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  // 管理员权限
  {
    path: '/cm',
    meta: {
      title: '课程管理',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/cm',
        meta: {
          title: '', icon: 'el-icon-menu', roles: ['admin']
        },
        component: resolve => require(['../components/page/keeper/coursemanagement.vue'], resolve)
      }
    ]
  },
  {
    path: '/sm',
    meta: {
      title: '学生管理',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/sm',
        meta: {
          title: '', icon: 'el-icon-menu', roles: ['admin']
        },
        component: resolve => require(['../components/page/keeper/StudentManagement.vue'], resolve)
      }
    ]
  },
  {
    path: '/cs',
    meta: {
      title: '选课统计',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/cs',
        meta: {
          title: '', icon: 'el-icon-menu', roles: ['admin']
        },
        component: resolve => require(['../components/page/keeper/coursestatistics.vue'], resolve)
      }
    ]
  },
  // 学生权限
  {
    path: '/cs1',
    meta: {
      title: '在线选课',
      icon: 'el-icon-setting',
      roles: ['editor']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/cs1',
        meta: {
          title: '', icon: 'el-icon-menu',
          roles: ['editor']
        },
        component: resolve => require(['../components/page/student/courseselection.vue'], resolve)
      }
    ]
  },
  {
    path: '/sc',
    meta: {
      title: '已选课程',
      icon: 'el-icon-setting',
      roles: ['editor']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        path: '/sc',
        meta: {
          title: '', icon: 'el-icon-menu',
          roles: ['editor']
        },
        component: resolve => require(['../components/page/student/selectedcourse.vue'], resolve)
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
