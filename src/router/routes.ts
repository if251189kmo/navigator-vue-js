import type { RouteRecordRaw } from 'vue-router'
import Home from 'pages/home/indexPage.vue'
import PageNotFound from 'src/pages/PageNotFound/indexPage.vue'
import PageWrapper from 'src/layouts/pageWrapper/indexPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PageWrapper,
    children: [{ path: '', component: Home }],
  },
  {
    path: '/:catchAll(.*)*',
    component: PageNotFound,
  },
]

export default routes
