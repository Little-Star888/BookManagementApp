import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
  { path: '/', redirect: '/flash' },
  { path: '/flash', name: 'flash', component: () => import('../pages/flash/FlashPage.vue') },
  {
    path: '/main', component: () => import('../pages/main/MainPage.vue'), children: [
      { path: '', redirect: '/main/home' },
      { path: 'home', name: 'home', component: () => import('../pages/home/HomePage.vue') },
      { path: 'category', name: 'category', component: () => import('../pages/category/CategoryPage.vue') },
      { path: 'bookshelf', name: 'bookshelf', component: () => import('../pages/bookshelf/BookshelfPage.vue') },
      { path: 'mine', name: 'mine', component: () => import('../pages/mine/MinePage.vue') },
    ]
  },
  { path: '/search', name: 'search', component: () => import('../pages/search/SearchPage.vue') },
  { path: '/list', name: 'list', component: () => import('../pages/list/ListPage.vue') },
  { path: '/detail/:id', name: 'detail', component: () => import('../pages/detail/DetailPage.vue') },
  { path: '/login', name: 'login', component: () => import('../pages/login/LoginPage.vue') },
  { path: '/personal', name: 'personal', component: () => import('../pages/personal/PersonalPage.vue') },
  { path: '/record', name: 'record', component: () => import('../pages/record/RecordPage.vue') },
]
const router = new VueRouter({
  routes,
  mode: 'hash'
})
export default router