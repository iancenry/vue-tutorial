<script setup>
import EventCard from '../components/Details.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService.js'

// pull query params passed as props from router
const props = defineProps(['page'])

const events = ref('')
const totalEvents = ref(0)

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  // if page is not last page
  return page.value < totalPages
})

onMounted(() => {
  // when reactive objects(i.e page value) that are accessed inside this function change, run this func again
  watchEffect(() => {
    // clear out the events on the page, so user knows API has been called not hanging
    events.value = null
    EventService.getEvents(2, page.value)
      .then((res) => {
        events.value = res.data
        // store total number of events
        totalEvents.value = res.headers['x-total-count']
      })
      .catch((err) => console.error(err))
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
