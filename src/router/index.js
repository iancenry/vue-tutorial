import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventListView,
    // Parse & set the current page from the router using Function Mode
    // if page exists parse the string to an int else return 1
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    // send in our route params as component props
    props: true,
    component: () => import('../views/event/Details.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
