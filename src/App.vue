<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'
import {onMounted,ref} from 'vue'
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000);
})
</script>

<template>
  <div v-if="loading">
    <Loading />
  </div>
  <header>
    <navbar></navbar>
  </header>
  
  <RouterView />
  <Footer></Footer>
</template>

<style scoped>

</style>
