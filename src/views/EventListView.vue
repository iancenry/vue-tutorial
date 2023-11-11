<script setup>
import EventCard from '../components/EventCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const events = ref(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events')
    .then((res) => (events.value = res.data))
    .catch((err) => console.error(err))
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
