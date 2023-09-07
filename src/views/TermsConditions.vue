<script setup lang="ts">
import {onMounted} from 'vue'
onMounted(() => {
      const anchor = window.location.hash;
      if (anchor) {
        const element = document.querySelector(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
});
</script>
<template>
    <div class="paddingMob p-5 GrotesqueFont" style="margin: 15vh 0;">
        <div class="paddingMob p-5 paddingMobX" id="terms">
            <h1>Terms & Conditions</h1>
            <p>By using this website, you agree to the following terms and conditions :</p>
            <ul class="surface-100 p-3 px-5" style="border-radius: 8px;">
                <li>
                <p class="GrotesqueFont">You must be at least 18 years old to use this website.</p>
                </li>
                <li>
                <p class="GrotesqueFont">You must provide accurate and up-to-date information when creating an account.</p>
                </li>
                <li>
                <p class="GrotesqueFont">You are responsible for the security of your account and password.</p>
                </li>
                <li>
                <p class="GrotesqueFont">You are responsible for all activity that occurs on your account.</p>
                </li>
                <li>
                <p class="GrotesqueFont">You agree not to use this website for illegal or unauthorized purposes.</p>
                </li>
                <li>
                <p class="GrotesqueFont">You agree not to post/ send any content that is hateful, discriminatory, or offensive.</p>
                </li>
                <li>
                <p class="GrotesqueFont">You agree not to spam or send unsolicited messages.</p>
                </li>
                <li>
                <p class="GrotesqueFont">You agree to abide by all applicable laws and regulations.</p>
                </li>
            </ul>
            <h1 class="my-3 mt-5" id="privacy">Privacy Policy</h1>
            <div class="surface-100 paddingMobX py-4 px-3" style="border-radius: 8px;">
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
            </div>
            <h1 class="my-3 mt-5" id="shipping">Shipping & Returns</h1>
            <ol class="surface-100 p-5" style="border-radius: 8px;">
                <h3 class="mb-4 text-center">Shipping Policies</h3>
                <li>
                    <p class="GrotesqueFont">Shipping Methods and Carriers: We offer a variety of shipping methods to ensure that you receive your vitamins and nutritional supplements in a timely and secure manner. </p>
                </li>
                <li>
                    <p class="GrotesqueFont">Processing Time: Orders are typically processed within 1-2 business days after payment confirmation. During high-demand periods, such as holidays or promotions, processing times may be slightly extended, but we strive to ship your order as quickly as possible.</p>
                </li>
                <li>
                    <p class="GrotesqueFont">Shipping Times: Shipping times vary based on your chosen shipping method and your location. </p>
                </li>
                <li>
                    <p class="GrotesqueFont">Shipping Rates: Shipping rates are calculated based on the shipping method selected, the destination address, and the total weight of the items in your order. </p>
                </li>
                <li>
                    <p class="GrotesqueFont">International Shipping: We offer international shipping to select countries. Shipping times and rates vary depending on the destination. Please note that customs fees, taxes, or import duties imposed by the destination country are the responsibility of the recipient. We recommend checking with your local customs office for more information. </p>
                </li>
                <li>
                    <p class="GrotesqueFont">Order Changes and Cancellations: If you need to make changes to your order or cancel it after it has been placed, please contact our customer support team as soon as possible. We will do our best to accommodate your request, but changes may not be possible if the order has already been processed or shipped. </p>
                </li>
                <li>
                    <p class="GrotesqueFont">Address Accuracy: Please ensure that the shipping address provided during checkout is accurate and complete. We are not responsible for any delays or delivery issues arising from incorrect or incomplete addresses. If you notice an error in your shipping address after placing your order, please contact us immediately.</p>
                </li>
            </ol>
            <div class="surface-100 p-5" style="border-radius: 8px;">
                <h3 class="my-5 text-center" id="returns">Returns Policies</h3>
                <p class="GrotesqueFont">We offer a 30-day money-back guarantee on all vitamins and nutritional supplements. If you are not satisfied with your purchase for any reason, you can return it for a full refund. To return a product, please contact us within 30 days of receiving it. We will provide you with a return shipping label.</p>
                <p class="GrotesqueFont">Products must be returned in their original packaging and in resalable condition. We cannot accept returns for products that have been opened or used.</p>
                <p class="GrotesqueFont">Once we receive your return, we will process your refund within 10 business days.</p>
                <p class="GrotesqueFont">The following items are not eligible for return:</p>
                <ul>
                    <li><p>Products that have been opened or used</p></li>
                    <li><p>Products that are not in their original packaging</p></li>
                    <li><p>Products that are more than 30 days old</p></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.GrotesqueFont{
    font-family: 'Bricolage Grotesque', sans-serif !important;
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
