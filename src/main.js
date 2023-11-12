import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // state management
app.use(router) // page/views routing
// global reactive object to share across multiple components
const GStore = reactive({ flashMessage: '' })
// make it available for components to use(inject)
app.provide('GStore', GStore)

app.mount('#app')
