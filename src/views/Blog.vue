<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";
const { push } = useRouter();

const isBlogActive = ref(false)
const Blog = ref()
const BlogDetails = ref()

const getBlog = () => {
     axios.get('https://api-lifeformula.com/api/blog').then((result) => {
        Blog.value = result.data.blog
        console.log(result.data.blog);
     }).catch((err) => {
        console.log(err);
        
     });
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
onBeforeMount(() => {
    getBlog()
})
</script>

<template>
    <div v-if="isBlogActive" @click="isBlogActive = false; scrollToTop()" style="z-index: 99999 !important;">
        <span class="material-symbols-outlined fixed p-2 font-bold text-5xl cursor-pointer" style="z-index: 99999 !important; background-color: #8dd9d6; border-radius: 50%; bottom: 20px; right: 30px;">
            arrow_back
        </span>
    </div>
    <div style="background-color: #8dd9d60d;">

        <div v-if="Blog && !isBlogActive" class="marginn w-11">
            <div class="w-11 m-auto flex flexColumn lg:flex-row justify-content-center" style="background-color: #8dd9d636; border-radius: 8px;">
                <div class="paddingMob lg:p-5">
                    <h1 class="tajwal md:px-1 lg:px-4 font-bold w-full md:mt-2 lg:mt-0 md:text-center lg:text-left lg:w-10">MFS : Empowering Male Fertility Naturally for a Joyful Future</h1>
                    <p class="tajwal py-2 md:px-1 lg:px-3">Reignite your fertility journey with our breakthrough natural supplement</p>
                    <!-- <p class="md:px-1 lg:px-3 underline cursor-pointer">READ MORE</p> -->
                </div>
                <img src="../assets/blogs1.jpg" style="border-bottom-right-radius: 8px; border-top-right-radius: 8px;" class="borderRounded max-h-25rem w-full md:w-7" alt="">
            </div>
            <h1 class="text-center my-5">Life Formula Library</h1>
            <div class="flex flex-wrap justify-content-center">
                <div v-for="(article,index) in Blog" :key="index">
                    <div v-if="article.product_article" class="py-0 md:mx-2 lg:mx-4 md:py-4 px-1 md:px-4 my-2 md:my-5" style="border-radius: 10px;">
                        <div class="flex justify-content-center align-items-center my-2" @click="scrollToTop(); isBlogActive = true; BlogDetails = Blog[index];">
                            <!-- <div class="image-container m-auto mb-2 cursor-pointer" @click="push(`/products/${article.id}`)"> -->
                                <!-- <img :src="article.image" style="border-radius: 10px;width: 250px;height: 200px;" alt=""> -->
                                <div class="">
                                    <div class="ProductImage mx-auto">
                                        <img :src="article.image" class="productt m-auto" alt="">
                                        <span class="material-symbols-outlined appearOnHover">
                                          visibility
                                        </span>
                                    </div>
                                    <div class="px-2">
                                        <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="addToCart(slotProps.data.id)">
                                            {{ article.name.split(' ').slice(0, 3).join(' ') }} blog
                                        </h4>
                                    </div>
                                </div>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isBlogActive" class="marginn w-11 marginX">
            <div class="text-sm text-left tajwal" v-html="BlogDetails.product_article">
            </div>
            <div class="mx-3">
                <div class="w-full flex justify-content-center">
                    <router-link :to="`/products/${BlogDetails.id}`"  @click="scrollToTop()" class="p-3 px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-2">SHOW PRODUCT</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@500&display=swap');
.tajwal{
    font-family: 'Tajawal', sans-serif !important;
}
.marginn{
    padding-top: 20vh;
    padding-right: 5rem;
    padding-left: 5rem;
    padding-bottom: 5vh;
    margin: 0vh auto 0vh;
}
.image-container {
    position: relative;
    display: inline-block;
    width: 250px;
    height: 200px;
}
  
.ProductImage{
    cursor: pointer;
    margin-bottom: 2vh;
    width: 310px;
    height: 260px;
    border-start-start-radius: 16px !important;
    border-start-end-radius: 16px !important;
}

.text-overlay {
    position: absolute;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the background color and transparency as needed */
    padding: 10px;
    color: #fff; /* Adjust the text color */
}
.divBg{
    background: linear-gradient(to bottom, var(--surface-100),  var(--blue-100));
}

@media screen and (max-width : 500px){
.marginn{
    padding-top: 12vh;
    margin: 0vh auto 0vh;
    padding-right: 0rem;
    padding-left: 0rem;
}    
.paddingMob{
    padding: 2vh !important;
}
.flexColumn{
    flex-direction: column !important;
}
.borderRounded{
    border-radius: 8px !important;
}
}
</style>

