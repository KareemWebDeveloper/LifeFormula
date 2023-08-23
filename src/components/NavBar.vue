<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { push } = useRouter();
let visible = ref(false)
function scrollToTop() {
  visible.value = false  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>
<template>
    <div class="NavBarrr w-full fixed">
        <nav class="bg-white w-full hidden lg:flex justify-content-around align-items-center p-3">
            <img src="../assets/LifeFourmlaLogo.png" style="width: 12%; cursor: pointer;" alt="" @click="push('/')">
                <div>
                    <router-link to="/" class="mx-3 no-underline colorHover" style="color: #30364b;" @click="scrollToTop()">Home</router-link> 
                    <router-link to="/about" class="mx-3 no-underline colorHover" style="color: #30364b;" @click="scrollToTop()">About Us</router-link> 
                    <router-link to="/products" class="mx-3 no-underline colorHover" style="color: #30364b;" @click="scrollToTop()">Shop</router-link> 
                    <router-link to="/" class="mx-3 no-underline colorHover" style="color: #30364b;" @click="scrollToTop()">Contact Us</router-link> 
                </div>
                <div class="pl-5">
                    <span class="material-symbols-outlined text-4xl mx-1 cursor-pointer colorHover fontHover">
                        account_circle
                    </span>
                    <span class="material-symbols-outlined text-4xl mx-2 cursor-pointer colorHover fontHover">
                        shopping_cart
                    </span>
                    <span class="material-symbols-outlined text-4xl mx-1 cursor-pointer colorHover fontHover">
                        favorite
                    </span>
                </div>
        </nav>
        <!-- medium and small navbar -->
        <nav class="lg:hidden bg-white w-full flex justify-content-between align-items-center p-3">
        <div class="flex align-items-center">
            <span class="material-symbols-outlined text-4xl cursor-pointer" @click="visible = true" >
                menu
            </span>
            <img src="../assets/LifeFourmlaLogo.png" class="md:w-4 sm:w-5 logo" alt="">
        </div>
        <div class="flex align-items-center">
            <span class="material-symbols-outlined text-4xl mx-1 cursor-pointer colorHover fontHover">
                account_circle
            </span>
            <span class="material-symbols-outlined text-4xl mx-2 cursor-pointer colorHover fontHover">
                shopping_cart
            </span>
            <span class="material-symbols-outlined text-4xl mx-1 cursor-pointer colorHover fontHover">
                favorite
            </span>
        </div>
        </nav>
    </div>
    <Sidebar v-model:visible="visible">
        <div>
            <img src="../assets/LifeFourmlaLogo.png" style="width: 50%;" alt="">
            <hr>
        </div>
        <div class="flex flex-column m-auto text-left p-3 px-3">
            <router-link to="/" class="flex align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">home</span>
                Home
            </router-link> 
            <router-link to="/about" class="flex align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">diversity_1</span>About Us</router-link> 
            <router-link to="/products" class="flex align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">shopping_basket</span>Shop</router-link> 
            <router-link to="/" class="flex align-items-center my-3 no-underline colorHover" @click="scrollToTop();" style="color: #30364b;"><span class="material-symbols-outlined text-2xl mx-2">contact_phone</span>Contact Us</router-link> 
        </div>
    </Sidebar>
</template>
<style>
nav{
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.302);
}
.NavBarrr{
    position: absolute;
    top: 0px;
    padding: 4vh;
    z-index: 10;
}
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 100,
  'GRAD' 0,
  'opsz' 48
}
.colorHover{
    transition-duration: 0.3s;
}
.colorHover:hover{
    color: #147ff2 !important;
}
.fontHover{
    transition-duration: 0.3s;
}
.fontHover:hover{
    font-size: 36px !important;
}
@media screen and (max-width: 600px) {
.logo{
    width: 35%;
}
.NavBarrr{
    position: absolute;
    top: 0px;
    padding: 2vh;
    z-index: 10;
}
}
@media screen and (max-width: 450px) {
    .logo{
        width: 55%;
    }
    .NavBarrr{
        position: absolute;
        top: 0px;
        padding: 1vh;
        z-index: 10;
    }
}
</style>
