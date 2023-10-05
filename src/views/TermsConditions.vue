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
      if (anchor) {
        const element = document.querySelector(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
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
            <!-- <div class="surface-100 paddingMobX py-4 px-3" style="border-radius: 8px;">
                <p class="GrotesqueFont">
                    We collect personal information from you when you create an account, place an order, or contact us. We use this 
                    information to provide you with the products and services you have requested, to communicate with you, and to improve
                    our website. We may also share your information with third-party service providers who help us operate our website or
                    process payments.
                </p>
                <p class="GrotesqueFont">
                    We will not sell or share your personal information with third parties for their marketing purposes without your 
                    consent. We will only retain your personal information for as long as necessary to provide you with the products 
                    and services you have requested or to comply with applicable laws and regulations.
                </p>
                <p class="GrotesqueFont">
                    You have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications from us.
                    To exercise these rights, please contact us at <span class="text-xl mx-2 GrotesqueFont">info@lifeformula.us</span> 
                </p>
                <p class="GrotesqueFont">
                    We take the security of your personal information seriously. We use appropriate security measures to protect your information from unauthorized access, use, or disclosure.
                    By using this website, you agree to the terms and conditions of this Privacy Policy. If you do not agree to these terms and conditions, please do not use this website.
                    We may update this Privacy Policy from time to time. The most current version of the Privacy Policy will be posted on this website. You should check this Privacy Policy 
                    periodically for changes. Your continued use of this website after any changes to this Privacy Policy will constitute your acceptance of those changes.
                </p>
            </div> -->
            <div v-html="termsConditionsContent.privacy_policy" v-if="termsConditionsContent.privacy_policy" class="surface-100 paddingMobX py-4 px-3" style="border-radius: 8px;">
            </div>

            <h1 class="my-3 mt-5" id="shipping">Shipping & Returns</h1>
            <ol class="surface-100 p-5" style="border-radius: 8px;">
                <h3 class="mb-4 text-center">Shipping Policies</h3>
                <div v-html="termsConditionsContent.shipping_policies" v-if="termsConditionsContent.shipping_policies" class="paddingMobX py-1 px-3" style="border-radius: 8px;">
                </div>
            </ol>
            <div class="surface-100 p-5" style="border-radius: 8px;">
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
        padding: 1vh 2vh !important;
    }
    .paddingMobX2{
        padding: 1vh 3vh !important;
    }
}
</style>
