<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

const termsConditionsContent = ref()

const getContent = () => {
     axios.get('https://api-lifeformula.com/api/terms-conditions').then((result) => {
        termsConditionsContent.value = result.data.termsAndConditions[0]
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
    getContent()
})
</script>
<template>
    <div v-if="termsConditionsContent" class="paddingMob marginTop p-3 GrotesqueFont gradient terms">
        <div class="paddingMob p-5 paddingMobX" id="terms">
            <h1 class="my-3 mt-5" id="shipping">Shipping & Returns</h1>
            <ol class="surface-100 py-5 paddingMobX md:px-5" style="border-radius: 8px;">
                <h3 class="mb-4 text-center">Shipping Policies</h3>
                <div v-html="termsConditionsContent.shipping_policies" v-if="termsConditionsContent.shipping_policies" class="paddingMobX py-1 px-3" style="border-radius: 8px;">
                </div>
            </ol>
            <div class="surface-100 py-5 paddingMobX md:px-5" style="border-radius: 8px;">
                <h3 class="my-5 text-center" id="returns">Returns Policies</h3>
                <div v-html="termsConditionsContent.returns_policies" v-if="termsConditionsContent.returns_policies" class="paddingMobX py-1 px-3" style="border-radius: 8px;">
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.GrotesqueFont{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
.gradient{
    background: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
}
.terms li{
    margin: 2.5vh 0;
}
.marginTop{
    padding-top: 15vh !important;
}
@media screen and (max-width : 570px){
    .paddingMob{
        padding: 0.2vh !important;
    }
    .marginTop{
        padding-top: 7vh !important;
      }
    .paddingMobX{
        padding: 3vh 1vh !important;
    }
    .paddingMobX2{
        padding: 1vh 3vh !important;
    }
}
</style>
