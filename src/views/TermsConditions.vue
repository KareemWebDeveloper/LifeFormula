<script setup lang="ts">
import { onMounted, ref, onBeforeMount } from 'vue';
import axios from 'axios';

const termsConditionsContent = ref()

const getContent = () => {
     axios.get('https://api-lifeformula.com/api/terms-conditions').then((result) => {
        termsConditionsContent.value = result.data.termsAndConditions[0]
     }).catch((err) => {
        console.log(err);
        
     });
}
onMounted(() => {
      const anchor = window.location.hash;
      console.log(anchor);
      
      if (anchor) {
          setTimeout(() => {
        const element = document.querySelector(anchor);
        console.log(element);
        if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
        }
        }, 2500);
      }
});
onBeforeMount(() => {
    getContent()
})
</script>
<template>
    <div v-if="termsConditionsContent" class="paddingMob p-5 GrotesqueFont terms" style="margin: 15vh 0;">
        <div class="paddingMob p-5 paddingMobX" id="terms">
            <h1>Terms & Conditions</h1>
            <p>By using this website, you agree to the following terms and conditions :</p>
            <div v-html="termsConditionsContent.terms_conditions" v-if="termsConditionsContent.terms_conditions" class="surface-100 p-3 px-5" style="border-radius: 8px;">
       
            </div>
            <h1 class="my-3 mt-5" id="privacy">Privacy Policy</h1>
            <div v-html="termsConditionsContent.privacy_policy" v-if="termsConditionsContent.privacy_policy" class="surface-100 paddingMobX py-5 px-3" style="border-radius: 8px;">
            </div>

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
                <!-- {{ termsConditionsContent }} -->
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.GrotesqueFont{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
.terms li{
    margin: 2.5vh 0;
}
@media screen and (max-width : 570px){
    .paddingMob{
        padding: 2vh !important;
    }
    .paddingMobX{
        padding: 3vh 1vh !important;
    }
    .paddingMobX2{
        padding: 1vh 3vh !important;
    }
}
</style>
