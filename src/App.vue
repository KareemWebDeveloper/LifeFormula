<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'
import {onMounted} from 'vue'
export default {
  components: {
    Loading,
    Footer,
    navbar,
  },
  setup() {
    const loading = ref(true)
    onMounted(() => {
      setTimeout(() => {
        loading.value = false
      }, 3000);
      
    })
    const router = useRouter()
    router.beforeEach(() => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false
      }, 2500);
    });
    return {
      loading,
  };
}
}

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
