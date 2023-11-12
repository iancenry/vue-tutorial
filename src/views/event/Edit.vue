<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'
import EventService from '../../services/EventService.js'

const props = defineProps({
  id: {
    required: true
  }
})

const event = ref(null)

onMounted(() => {
  EventService.getEvent(props.id)
    .then((res) => (event.value = res.data))
    .catch((err) => console.error(err))
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <!-- /event/2 -->
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link
      >
      |
      <!-- /event/2/register -->
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link
      >
      |
      <!--  /event/2/register  -->
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link
      >
    </div>
    <p>Edit event here</p>
  </div>
</template>
