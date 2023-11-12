<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref, defineProps, computed } from 'vue'
import EventService from '@/services/EventService.js'
import router from '../../router'

const props = defineProps(['id'])

const id = computed(() => props.id)

const event = ref(null)
onMounted(() => {
  EventService.getEvent(id.value)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error(error)
      router.push({
        name: '404Resource',
        params: { resource: 'event' }
      })
    })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav id="nav">
      <!-- /event/2 -->
      <!-- no need to pass id in each route below, since :id is required
        for each child path if :id isn't sent in, it will look and use the :id param that is present in the url  -->
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <!-- /event/2/register -->
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <!--  /event/2/register  -->
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </nav>
    <router-view :event="event" />
  </div>
</template>
