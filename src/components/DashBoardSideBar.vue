<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from 'primevue/sidebar';
const visible = ref(false)
function scrollToTop() {
  visible.value = false  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>
<template>
    <div v-if="!visible" @click="visible = true" class="fixed p-3 flex justify-content-center align-items-center cursor-pointer surface-300"
     style="position: fixed;top: 50%;left: 15px;transform: translate(0, -50%);z-index: 999; border-radius: 50%;">
        <span class="material-symbols-outlined text-center p-0 m-0 text-4xl">
            widgets
        </span>
    </div>
    <Sidebar v-model:visible="visible" class="w-full md:w-20rem lg:w-22rem">
        <div>
            <!-- <img src="../assets/LifeFourmlaLogo.png" style="width: 40%;" alt=""> -->
            <h2 class="fontt">Admin Panel Menu</h2>
            <hr>
        </div>
        <div class="flex flex-column m-auto text-left p-3 px-3">
            <router-link to="/dashboard" class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">home</span>
                Dashboard
            </router-link> 
            <!-- <h6 class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">diversity_1</span>Add Products</h6>  -->
            <router-link to="/dashboard/products/edit" class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">spa</span>Edit Products</router-link> 
            <router-link to="/dashboard/products/add" class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">post_add</span>Add Products</router-link> 
            <router-link to="/dashboard/categories" class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">category</span>Categories</router-link> 
            <router-link to="/dashboard/users" class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">manage_accounts</span>User Roles</router-link> 
            <router-link to="/dashboard/terms-conditions" class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">policy</span>Policies</router-link> 
            <router-link to="/dashboard/orders" class="flex fontt align-items-center my-3 no-underline colorHover" @click="scrollToTop(); isDialogVisible = true" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">view_list</span>Orders</router-link> 
        </div>
    </Sidebar>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.fontt{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
</style>