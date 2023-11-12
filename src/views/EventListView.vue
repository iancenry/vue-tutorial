<script setup>
import EventCard from '../components/EventCard.vue'
import { ref, onMounted, computed } from 'vue'
import EventService from '@/services/EventService.js'

// pull query params passed as props from router
const props = defineProps(['page'])

const page = computed(() => props.page)

const events = ref(null)

onMounted(() => {
  EventService.getEvents(2, page.value)
    .then((res) => (events.value = res.data))
    .catch((err) => console.error(err))
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
