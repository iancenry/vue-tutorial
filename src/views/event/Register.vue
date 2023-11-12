<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const router = useRouter()

const props = defineProps(['event'])

const register = () => {
  // if registration API call is successful
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
