<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";
const { push } = useRouter();

const Blog = ref()

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
    <div class="blog surface-100">
        <div v-if="Blog" class="marginn w-11">
            <!-- <h1 class="text-center">Blog</h1> -->
            <div v-for="(article,index) in Blog" :key="index">
                <div v-if="article.product_article" class="divBg py-4 px-2 md:px-4 my-5" style="border-radius: 10px;">
                    <div class="flex justify-content-between align-items-center my-2">
                        <div class="image-container m-auto mb-2 cursor-pointer" @click="push(`/products/${article.id}`)">
                            <img :src="article.image" style="border-radius: 10px;width: 250px;height: 200px;" alt="">
                            <div class="text-overlay" style="width: 250px">
                                <p class="text-sm w-full text-center m-0 p-0" style="text-shadow: 0px 0px 4px black;">{{ article.name }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-html="article.product_article">
                    </div>
                    <div class="mx-3">
                        <div class="w-full flex justify-content-center">
                            <router-link :to="`/products/${article.id}`"  @click="scrollToTop()" class="p-3 px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-2">SHOW PRODUCT</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.blog *{
    text-align: center;
}
.marginn{
    margin: 20vh auto 2vh;
}
.image-container {
    position: relative;
    display: inline-block;
    width: 250px;
    height: 200px;
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
    margin: 12vh auto 2vh;
}    
}
</style>

