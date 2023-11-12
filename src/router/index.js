import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventListView.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    // Parse & set the current page from the router using Function Mode
    // if page exists parse the string to an int else return 1
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    // send in our route params as component props
    props: true,
    component: EventLayout,
    children: [
      {
        // loaded at route path
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  {
    // event/:id will redirect to events/:id
    path: '/event/:id',
    redirect: (to) => {
      // return { name: 'EventDetails', parmas: { id: to.params.id } } - no need for id since it will be auto passed through
      return { name: 'EventDetails' }
    },
    children: [
      { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
      { path: 'edit', redirect: () => ({ name: 'EventEdit' }) }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    // handle event that doesn't exist - can be reusd for other resources
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    // handle page that doesn't exist
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
