<script setup lang="ts">
import SpeedDial from 'primevue/speeddial';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const { push } = useRouter();
const items2 = ref([
    {
        label: 'Whatsapp',
        icon: 'pi pi-question',
        command: () => {
            push('/');
        }
    },
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            push('/');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-comment',
        command: () => {
            push('/');
        }
    }
])

const items = ref([
  {
      label: 'Add',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('hii');
    }
  },
  {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        console.log('hii');
      }
  },
  {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        console.log('hii');
      }
  },
  {
      label: 'Upload',
      icon: 'pi pi-upload',
      command: () => {
        console.log('hii');
      }
  },
  {
      label: 'Vue Website',
      icon: 'pi pi-external-link',
      command: () => {
          window.location.href = 'https://vuejs.org/'
      }
  }
])
</script>
<template>
    <div style="z-index: 11; position: fixed; bottom: 13vh; right: 5vh;">
        <!-- <div class="flex align-items-end justify-content-center" :style="{ position: 'relative', height: '350px' }"> -->
            <SpeedDial :model="items2" :radius="90" type="quarter-circle" showIcon="pi pi-comments" direction="up-left" :style="{ right: 0, top: 0 }" :transitionDelay="60" />
        </div>

    <!-- </div> -->
</template>
<style>
.p-speeddial .p-button{
    background-color: #00a650 !important;
    border: 1px solid white;
}
.p-speeddial-action {
    background-color: #00405a !important;
    text-decoration: none !important;
}
</style>