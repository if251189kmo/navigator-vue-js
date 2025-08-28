import type { RouteRecordRaw } from 'vue-router'
import HomePage from 'pages/home/HomePage.vue'
import PageNotFound from 'src/pages/PageNotFound/PageNotFound.vue'
import PageWrapper from 'src/layouts/pageWrapper/PageWrapper.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PageWrapper,
    children: [{ path: '', component: HomePage }],
  },
  {
    path: '/:catchAll(.*)*',
    component: PageNotFound,
  },
]

export default routes
