import type { RouteRecordRaw } from 'vue-router'
import MyTabs from 'pages/MyTabs.vue'
import ErrorNotFound from 'pages/ErrorNotFound.vue'
import MainLayout from 'layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', component: MyTabs }],
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
]

export default routes
