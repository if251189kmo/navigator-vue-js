import type { RouteRecordRaw } from 'vue-router'
import HomePage from 'pages/home/HomePage.vue'
import WebAppsList from 'src/pages/webAppsList/WebAppsList.vue'
import PageNotFound from 'src/pages/pageNotFound/PageNotFound.vue'
import PageWrapper from 'src/layouts/pageWrapper/PageWrapper.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PageWrapper,
    children: [
      { path: '', component: HomePage },
      { path: '/web-apps-list', component: WebAppsList }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: PageNotFound,
  },
]

export default routes
