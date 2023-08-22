<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <navbar></navbar>
  </header>
  
  <RouterView />
  <Footer></Footer>
</template>

<style scoped>

</style>
