import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      // Parse & set the current page from the router using Function Mode
      // if page exists parse the string to an int else return 1
      props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/event/:id',
      name: 'event-details',
      // send in our route params as component props
      props: true,
      component: () => import('../views/EventDetailsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
