<script setup lang="ts">
import Fieldset from 'primevue/fieldset';
import ContactIcons from '@/components/ContactIcons.vue';
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>
<template>
  <ContactIcons></ContactIcons>
 <div class="w-full">

<div class="hidden w-full lg:block AboutBg">
  <div class="p-5">
    <div class="w-full m-auto" style="padding: 20vh;">
      <Fieldset :toggleable="false">
        <template #legend>
          <div class="flex align-items-center text-primary">
            <span class="material-symbols-outlined text-6xl logoSecondaryColor">
              diversity_1
            </span>
              <span class="logoSecondaryColor mx-3 text-2xl pt-2">ABOUT US</span>
          </div>
      </template>
      <img src="../assets/LifeFourmlaLogo.png" class="w-5 m-auto flex justify-content-center pr-3 mb-2" alt="">
        <p class="text-center w-12 m-auto">
          Welcome to <span class="greenLogoColor text-xl">Life Formula</span>, where commitment to wellness comes first. Our journey began with a passion for making a positive impact
           on people's lives through premium vitamins and supplements. Drawing upon our extensive expertise in the realm of importation, distribution, and personalized customer consultation within the vitamins and nutritional supplements sector, we have cultivated a resolute belief that everyone deserves access to products that promote a healthier and happier life.
        </p>
    </Fieldset>
    </div>
  </div>
</div>

<!-- for responsive  -->
<div class="w-full lg:hidden">
  <img src="../assets/bgAbout.png" class="w-full lg:hidden" alt="">
  <div class="hidden sm:block blockk">
    <Fieldset :toggleable="false">
      <template #legend>
        <div class="flex align-items-center text-primary">
          <span class="material-symbols-outlined text-6xl logoSecondaryColor">
            diversity_1
          </span>
            <span class="logoSecondaryColor mx-3 text-2xl pt-2">ABOUT US</span>
        </div>
    </template>
    <img src="../assets/LifeFourmlaLogo.png" class="w-5 m-auto flex justify-content-center pr-3 mb-2" alt="">
      <p class="text-justify w-12 m-auto text-sm">
        Welcome to <span class="greenLogoColor text-xl">Life Formula</span>, where commitment to wellness comes first. Our journey began with a passion for making a positive impact
         on people's lives through premium vitamins and supplements. Drawing upon our extensive expertise in the realm of importation, distribution, and personalized customer consultation within the vitamins and nutritional supplements sector, we have cultivated a resolute belief that everyone deserves access to products that promote a healthier and happier life.
      </p>
  </Fieldset>
  </div>
  <div class="hidden md:block w-10" style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%);">
    <Fieldset :toggleable="false">
      <template #legend>
        <div class="flex align-items-center text-primary">
          <span class="material-symbols-outlined text-6xl logoSecondaryColor">
            diversity_1
          </span>
            <span class="logoSecondaryColor mx-3 text-2xl pt-2">ABOUT US</span>
        </div>
    </template>
    <img src="../assets/LifeFourmlaLogo.png" class="w-3 m-auto flex justify-content-center pr-3 mb-2" alt="">
      <p class="text-center w-12 m-auto">
        Welcome to <span class="greenLogoColor text-xl">Life Formula</span>, where commitment to wellness comes first. Our journey began with a passion for making a positive impact
         on people's lives through premium vitamins and supplements. Drawing upon our extensive expertise in the realm of importation, distribution, and personalized customer consultation within the vitamins and nutritional supplements sector, we have cultivated a resolute belief that everyone deserves access to products that promote a healthier and happier life.
      </p>
  </Fieldset>
  </div>
</div>


<div class="w-11 m-auto">

  <div class="w-full flex lg:flex-row flexColumnn sm:flex-column md:flex-column align-items-center p-5 paddingMob textCenterResp">
    <div>
      <div class="flex align-items-center flexColumnn">
        <h1 class="margAuto">Our Mission and Values </h1>
        <span class="material-symbols-outlined text-5xl mx-2">other_admission</span>
      </div>
      <p class="w-11 darkGrey margAuto width95 justifyy textCenterMob">At Life Formula, our mission is enabling healthier choices by providing vitamins and supplements that empower you to take control
        of your well-being and thrive. Transparency, empowerment, and affordability are the cornerstones of our values.</p>
    </div>
    <img src="../assets/steptodown.com693871.jpg" class="w-5 imageHoverr width75" style="border-radius: 20%;" alt="">
  </div>


  <div class="w-full flex align-items-center lg:flex-row flexColumnRev sm:flex-column-reverse md:flex-column-reverse p-5 paddingMob textCenterResp">
    <img src="../assets/aboutUs.jpg" class="w-5 imageHoverr width75" style="border-radius: 20%;" alt="">
    <div class="px-5 padding0">
      <h1 class="margAuto">Quality Assurance <span class="material-symbols-outlined text-6xl">
        volunteer_activism
        </span></h1>
      <p class="w-11 darkGrey margAuto width95 justifyy textCenterMob">With transparency as our cornerstone, we commit to delivering premium quality products that are formulated
        in the USA. Our wide range of supplements are manufactured and packaged in an FDA-registered & inspected facility. </p>
    </div>
  </div>

  
  <div class="w-full flex align-items-center lg:flex-row flexColumnn sm:flex-column md:flex-column p-5 paddingMob textCenterResp">
    <div class="px-5 padding0">
      <div class="flex align-items-center flexColumnn">
        <h1 class="mt-2 margAuto">Transparency and Empowerment</h1>
        <span class="material-symbols-outlined text-6xl mx-2">ecg_heart</span>
      </div>
      <p class="w-11 darkGrey margAuto width95 justifyy textCenterMob">We believe you deserve to know exactly what you're putting into your body. That's why we provide comprehensive
        information about each product's ingredients, sourcing, and benefits. </p>
      </div>
      <img src="../assets/aboutUs2.jpg" class="w-5 imageHoverr width75" style="border-radius: 20%;" alt="">
  </div>
  <div class="w-10 m-auto text-center my-5">
    <h1>Start Your Wellness Journey</h1>
    <p>
      Ready to take the first step towards a healthier you? Explore our wide range of products and embark on your wellness journey.
    </p>
    <div class="w-full m-auto flex justify-content-center">
      <router-link to="/products" class="p-3 px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4" @click="scrollToTop()">SHOP NOW</router-link>
    </div>
  </div>
</div>

 </div>

</template>
<style>
.AboutBg{
  background-image: url("../assets/bgAbout.png");
  background-size: cover; /* Adjust as needed */
}
.imageHoverr{
  transition-duration: 0.3s;
}
.imageHoverr:hover{
  margin-right: 2.5vh !important;
  border-radius: 25% !important;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.501);
}
@media screen and (max-width : 1000px){
  .textCenterResp{
    text-align: center !important;
  }
  .margAuto{
    margin: auto !important;
  }
  .width95{
    width: 93% !important;
    margin: 2vh auto !important;
  }
  .width75{
    width: 80% !important;
  }
  .padding0{
    padding: 0 !important;
  }
  .justifyy{
    text-align: center;
    text-align: justify !important;
  }
}
@media screen  and (max-width : 580px) {
  .blockk{
    display: block !important;
  }
  .textCenterMob{
    text-align: center !important;
  }
  .justifyyMob{
    text-align: justify !important;
  }
  .flexColumnn{
    display: flex;
    flex-direction: column !important;
  }
  .flexColumnRev{
    flex-direction: column-reverse !important;
  }
  .paddingMob{
    padding: 2vh 0 !important;
  }
}
</style>
