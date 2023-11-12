<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from 'vue-router'
import { defineProps, inject } from 'vue'

const router = useRouter()
const GStore = inject('GStore')

const { event } = defineProps(['event'])

const register = () => {
  // if registration API call is successful
  GStore.flashMessage = `You are successfully registered for ${event.title}`
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000)
  //Push back to event details - aka programmatic navigation
  router.push({
    name: 'EventDetails'
    // id: props.event.id - populated by default
  })
}
</script>
<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>
