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
            <h1 class="my-3 mt-5 text-center" id="privacy">Privacy Policy</h1>
            <div class="surface-100">
                <div v-html="termsConditionsContent.privacy_policy" v-if="termsConditionsContent.privacy_policy" class="paddingMobX py-5 px-3" style="border-radius: 8px;">
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
