<script setup>
import EventCard from '../components/EventCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService.js'

// pull query params passed as props from router
const props = defineProps(['page'])

const page = computed(() => props.page)

const events = ref('')
const totalEvents = ref(0)

onMounted(() => {
  // when reactive objects(i.e page value) that are accessed inside this function change, run this func again
  watchEffect(() => {
    // clear out the events on the page, so user knows API has been called not hanging
    events.value = null
    EventService.getEvents(2, page.value)
      .then((res) => (events.value = res.data))
      .catch((err) => console.error(err))
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <router-link
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >Prev Page</router-link
    >

    <router-link
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >
  </div>
</template>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
