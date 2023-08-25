<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ScrollPanel from 'primevue/scrollpanel';
import Carousel from 'primevue/carousel';
import ContactIcons from '@/components/ContactIcons.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import {ref , onMounted} from 'vue'
import { useRouter } from 'vue-router';
const { push } = useRouter();
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const Featured = [
  {
    productId : "3",
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/Mockup%20with%20Golden%20Flip%20Top.jpg",
    productName : "Raspberry ketone",
    CategoryName : "Wellness Supplements",
    Price : '7.20$',
    OldPrice : '13.00$', 
    Sale : "-35%",
  },
  {
    productId : "6",
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/MFS.jpg",
    productName : "MFS",
    CategoryName : "Fertility Supplements",
    Price : '36.50$',
  },
  {
    productId : "2",
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/GreenCoffee.jpg",
    productName : "Green coffee",
    CategoryName : "Wellness Supplements",
    Price : '13.90$',
    OldPrice : '18.00$', 
    Sale : "-20%",
  },
  {
    productId : "4",
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/D3-10000%20LQ.jpg",
    productName : "D3 10,000 IU",
    CategoryName : "Wellness Supplements",
    Price : '8.60$',
  },
]

const responsiveOptions = ref([
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
]);

const isDialogVisible = ref(false)

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
  <ContactIcons></ContactIcons>

<Dialog v-model:visible="isDialogVisible" modal header="Sorry!" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
    <span class="material-symbols-outlined text-6xl  text-center m-auto flex justify-content-center cursor-pointer">
        login
    </span>
    <h4 class="text-center p-2">Please Login First So You Can Add To Cart!</h4>
    <template #footer>
        <Button label="No" icon="pi pi-times" @click="isDialogVisible = false" text />
        <Button label="Yes" icon="pi pi-check" @click="isDialogVisible = false" autofocus />
    </template>
</Dialog>    

  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <!-- <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button> -->
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" style="position: relative;">
        <img src="../assets/steptodown.com664231.jpg" class="d-block MobCarouselImg md:w-full lg:w-full" alt="...">
        <div class="kimo w-6 text-center ResponsiveCarouselPg" style="position: absolute; top: 36%; left: 22%; transform: translate(-50%, -50%);">
          <img src="../assets/FormulaGreenLogo.png" class="w-1 noneResp" alt="">
          <p class="mt-2 text-lg lg:text-3xl kanitFont font-bold logoSecondaryColor">Experience the Life Formula Difference</p>
        </div>
        <h4 style="position: absolute; top: 42%; left: 22%; transform: translate(-50%, -50%);"
         class="p-3 text-center ResponsiveCarouselShopNow m-auto bg-white bluePrimary no-underline px-5 shopNow my-5 cursor-pointer"  @click="push('/products'); scrollToTop()">SHOP NOW</h4>
      </div>
      <div class="carousel-item" style="position: relative;">
        <img src="../assets/hth8.jpg" class="d-block MobCarouselImg md:w-full lg:w-full" alt="...">
        <div class="kimo" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <h4 class="p-3 text-center m-auto bg-white bluePrimary no-underline px-5 shopNow my-5 cursor-pointer"  @click="push('/products'); scrollToTop()">SHOP NOW</h4>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev buttonn" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon buttonn" aria-hidden="true"></span>
      <span class="visually-hidden buttonn">Previous</span>
    </button>
    <button class="carousel-control-next buttonn" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon buttonn" aria-hidden="true"></span>
      <span class="visually-hidden buttonn">Next</span>
    </button>
  </div>

  <!-- best selling heading -->
  <div class="w-full py-3" style="background-color: #f2f4f7ec;">
    <div class="w-full">
      <div class="px-5 py-3">
        <div class="headingg flex Mob-JustifyCenter" style="align-items: center;">
        <span class="material-symbols-outlined ml-3 Mob-left0 text-4xl greenLogoColor">
          ecg
        </span>
        <h4 class="mx-2 greenLogoColor mt-2 Mob-TextCenter">Our Products</h4>
      </div>
      <div class="w-full flex align-items-center IconsColumn">
        <h1 class="mx-4" style="color: #00405a; letter-spacing: 2px;">Featured</h1>
        <hr class="w-full" style="width: 75%; height: 0.3vh; background-color: black;">
      </div>
    </div>
  </div>

  <!-- best selling heading end-->

  <!-- best selling card-->
<div class="m-auto noneForMob" style="width: 88%;">
  <Carousel :value="Featured" :numVisible="3" :numScroll="1" circular :responsiveOptions="responsiveOptions" :autoplayInterval="4500">
    <template #item="slotProps">
      <div class="p-4 CARD m-auto" style="width: fit-content;">
        <div class="ProductImage" @click="push(`/products/${slotProps.data.productId}`); scrollToTop()">
          <img :src="slotProps.data.productImage" class="productt" alt="">
          <span class="material-symbols-outlined appearOnHover">
            visibility
          </span>
          <h4 v-if="slotProps.data.Sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">{{ slotProps.data.Sale }}</h4>
        </div>
        <div class="px-2">
            <p style="color: grey;" class="text-sm my-2">{{slotProps.data.CategoryName}}</p>
            <h3 class=" my-2">{{slotProps.data.productName}}</h3>
            <p class="text-sm greenLogoColor my-2">{{ slotProps.data.Price }} <span style="color: grey; text-decoration: line-through;" v-if="slotProps.data.OldPrice" class="mx-2">{{slotProps.data.OldPrice}}</span></p>
            <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="isDialogVisible = true">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
              shopping_cart
          </span> </h4>
        </div>
      </div>
    </template>
</Carousel>
</div>

  <!-- Best Selling Products for mobile -->
<div class="m-auto sm:hidden lg:hidden md:hidden" style="width: 100%;">
  <Carousel :value="Featured" :numVisible="1" :numScroll="1" orientation="vertical" circular verticalViewPortHeight="530px" 
  containerClass="w-full" contentClass="flex align-items-center">
    <template #item="slotProps">
      <div class="p-4 CARD m-auto" style="width: fit-content;">
        <div class="ProductImage" @click="push(`/products/${slotProps.data.productId}`); scrollToTop()">
          <img :src="slotProps.data.productImage" class="productt" alt="">
          <span class="material-symbols-outlined appearOnHover">
            visibility
          </span>
          <h4 v-if="slotProps.data.Sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">{{ slotProps.data.Sale }}</h4>
        </div>
        <div class="px-2">
            <p style="color: grey;" class="text-sm my-2">{{slotProps.data.CategoryName}}</p>
            <h3 class=" my-2">{{slotProps.data.productName}}</h3>
            <p class="text-sm greenLogoColor my-2">{{ slotProps.data.Price }} <span style="color: grey; text-decoration: line-through;" v-if="slotProps.data.OldPrice" class="mx-2">{{slotProps.data.OldPrice}}</span></p>
            <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="isDialogVisible = true">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
              shopping_cart
          </span> </h4>
        </div>
      </div>
    </template>
</Carousel>
</div>

</div>

<div class="flex lg:flex-row md:flex-column sm:flex-column p-4 py-5 w-full Icons" style="background-color: #f2f4f765;">
  <img src="../assets/Product-5-1-1.png" class="lg:m-5 pr-3 lg:w-8 IconsImg" alt="">
  <div class="flex IconsColumn">
    <div class="flex flex-column">
      <div class="flex flex-column justify-content-center m-auto" style="width: fit-content;">
        <span class="material-symbols-outlined text-8xl m-auto hoverIcon greenLogoColor">
          handshake
          </span>
          <h4 class="m-auto my-2 text-center w-full">Transparency</h4>
          <p class="w-11 w-9 m-auto text-center darkGrey">At Life Formula, we are honest and open about the ingredients, manufacturing process, and testing procedures used to create our products.</p>
      </div>
      <div class="flex flex-column justify-content-center m-auto" style="width: fit-content;">
        <span class="material-symbols-outlined text-8xl m-auto hoverIcon greenLogoColor">
          psychology
          </span>
          <h4 class="m-auto my-2 text-center">Empowerment</h4>
          <p class="w-11 m-auto text-center darkGrey">At Life Formula, we encourage our customers to take control of their health and well-being by providing them with the information and resources they need to make informed decisions about their vitamin and supplement intake.</p>
      </div>
      <div class="flex flex-column justify-content-center m-auto" style="width: fit-content;">
        <span class="material-symbols-outlined text-8xl m-auto hoverIcon greenLogoColor">
          price_check
          </span>
          <h4 class="m-auto my-2 text-center">Affordability</h4>
          <p class="w-11 m-auto text-center darkGrey">At Life Formula, we aim to make our products accessible to the widest range of customers by offering competitive prices</p>
      </div>

    </div>
    <div class="flex flex-column">
      
      <!-- <div class="flex flex-column  m-auto justify-content-center">
        <span class="material-symbols-outlined text-8xl hoverIcon greenLogoColor m-auto">
          monitor_heart
          </span>
          <h4 class="m-auto my-2 text-center">IMPROVE HEALTH</h4>
          <p class="lg:w-8 w-9 text-center m-auto darkGrey">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ullam, a nihil, cum dolores</p>
      </div> -->
    </div>
  </div>
</div>

<div class="relative cursor-pointer" @click="push('/about'); scrollToTop()">
  <img src="../assets/MobileAdvertise.png" class="hidden MobBlock w-full lg:h-full" alt="">
  <img src="../assets/advertisement.png" class="noneForMob w-full h-8rem lg:h-full" alt="">
  <img src="../assets/LifeFourmlaLogo.png" style="position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);" class="w-2 noneForMob" alt="">
  <div style="position: absolute; top: 65%; left: 50%; transform: translate(-50%, -50%);" class="sm:w-10 md:w-9 w-full Mobtop50">
    <h3 class="text-center cursor-pointer aboutUs text-xl lg:text-2xl" style="color: #00405a; text-shadow: 0px 0px 4px rgba(255, 255, 255, 0.79);" @click="push('/about'); scrollToTop()">ABOUT US</h3>
    <p class="text-white text-center hidden MobWidth100 MobBlock w-9 text-sm lg:text-lg m-auto lg:flex" style="text-shadow: 0px 0px 4px black;">Ready to take the first step towards a healthier you? Explore our wide range of products and embark on your wellness journey.</p>
  </div>
</div>


<!-- Reviews  -->
<div class="p-0 lg:p-5 marginnn text-center">
  <h3 class="text-center flex align-items-center m-auto justify-content-center darkGrey mb-5"><span class="material-symbols-outlined mx-2 text-5xl">
    reviews
    </span>OUR CUSTOMERS FEEDBACKS</h3>
  <div class="Reviews flex flex-wrap lg:flex-nowrap justify-content-center">
    <div class="p-5 reviewCard relative">
        <h3>Sophia Smith</h3>
        <div class="rating my-3">
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
        </div>
        <p class="WhiteHover" style="color: rgba(0, 0, 0, 0.733); cursor: default; width: 98%;">"Life Formula Company is one of the best and fastest companies in the field of nutritional and pharmaceutical supplements and I recommend it to all friends"</p>
        <img src="../assets/user.png" class="absolute w-2" style="top: -30px; left: 20px;"  alt="">
    </div>
    <div class="p-5 reviewCard relative">
        <h3>Daniel Wild</h3>
        <div class="rating my-3">
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
        </div>
        <p class="WhiteHover my-5" style="color: rgba(0, 0, 0, 0.733); cursor: default; width: 98%;">"A trust worthy company"</p>
        <img src="../assets/user.png" class="absolute w-2" style="top: -30px; left: 20px;"  alt="">
    </div>
    <div class="p-5 reviewCard relative">
        <h3>Casey Murphy</h3>
        <div class="rating my-3">
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
          <i class="fa-solid fa-star nocolor"></i>
        </div>
        <p class="WhiteHover my-5" style="color: rgba(0, 0, 0, 0.733); cursor: default; width: 98%;">"Best medical supplier All medicines are available"
        </p>
        <img src="../assets/user.png" class="absolute w-2" style="top: -30px; left: 20px;"  alt="">
    </div>
  </div>
</div>

<!-- // FAQ -->



<div class="w-full py-5" style="background-color: #f2f4f7bc;">
  <!-- FAQ HEADER -->
  <h3 class="flex align-items-center justify-content-center bluePrimary text-center fontSizeMob"><span class="material-symbols-outlined text-4xl lg:text-6xl">contact_support</span> FREQUENTLY ASKED QUESTIONS</h3>
  <h1 class="flex justify-content-center text-center" style="letter-spacing: 4px;">You've Got Any Questions?</h1>
  <p class="text:justify lg:text-center w-11 lg:w-8 m-auto my-3 mb-4 textJustifyMob">
    At Life Formula, we encourage our customers to take control of their health and well-being by providing them with the information and resources they need to make informed decisions about their vitamin and supplement intake</p>
  <!-- FAQ CONTENT -->
  <div class="w-full flex lg:flex-row sm:flex-column md:flex-column justify-content-center px-3 align-items-center FAQ" id="FAQ">
  <div style="width: 45%;" class="flex align-items-center md:w-7 sm:w-8 faqImg">
    <img src="../assets/vitaminsFaq.png" class="w-full" alt="faq">
  </div>
  <div style="width: 45%;" class="sm:w-full md:w-full accordion">
    <Accordion :activeIndex="0">
      <AccordionTab>
        <template #header>
          <div class="text-center flex align-items-center">
            <span class="material-symbols-outlined mx-2 text-3xl">
              prescriptions
              </span>
            <span>Do I need to take vitamins and supplements if I eat a healthy diet?</span>
          </div>
      </template>
        <ScrollPanel style="width: 100%; height: 200px">
          <p>
            Supplements can help you fill in the gaps in your diet and get the nutrients you need to
            stay healthy. They can also help you improve your mood, sleep, and overall well-being.
            There are many different types of supplements available, so you can choose the ones
            that are right for you.<br><br>
            Here are some of the benefits of taking supplements:
          </p>
            <ul class="my-2">
              <li class="my-2"><span class="font-bold">Improved energy levels</span> : Supplements can help you feel more energetic
                throughout the day.</li>
              <li class="my-2"><span class="font-bold">Better focus and concentration</span> : Supplements can help you improve your focus
                and concentration, which can be helpful for students, professionals, and anyone
                who needs to be mentally sharp</li>
              <li class="my-2"><span class="font-bold">Clarity of mind</span> : Supplements can help improve your clarity of mind and reduce
                brain fog.</li>
              <li class="my-2"><span class="font-bold">Boosted immune system</span> : Supplements can help boost your immune system and
                protect you from disease.</li>
              <li class="my-2"><span class="font-bold">Improved mood</span> : Supplements can help improve your mood and reduce stress
                and anxiety.</li>
              <li class="my-2"><span class="font-bold">Better Sleep</span> : Supplements can help you get a better night's sleep, which can
                improve your overall health and well-being.</li>
            </ul>
          </ScrollPanel>
        </AccordionTab>
        <AccordionTab>
          <template #header>
            <div class="text-center flex align-items-center">
              <span class="material-symbols-outlined mx-2 text-3xl">
                medication_liquid
                </span>
              <span>How do I know which vitamins and supplements are right for me?</span>
            </div>
        </template>
          <p>
            Here are some factors to consider when choosing vitamins and supplements:
          </p>
          <ol class="p-2 px-4">
            <li>Your age, sex, and lifestyle</li>
            <li>Your overall health</li>
            <li>Any medical conditions you have</li>
            <li>Your diet</li>
            <li>Your budget</li>
          </ol>
          <p>It is also important to choose vitamins and supplements that are high quality and made
          from reputable brands.</p>
        </AccordionTab>
        <AccordionTab>
          <template #header>
            <div class="text-center flex align-items-center">
              <span class="material-symbols-outlined mx-2 text-3xl">
                pill
                </span>
              <span>How much should I take?</span>
            </div>
        </template>
          <p>
            The dosage of vitamins and supplements will vary depending on the individual. It is
            important to follow the directions on the label carefully. Do not take more than the
            recommended dosage.
            </p>
          </AccordionTab>
        <AccordionTab>
          <template #header>
            <div class="text-center flex align-items-center">
              <span class="material-symbols-outlined mx-2 text-3xl">
                ecg_heart
                </span>
              <span>How long should I take vitamins and supplements?</span>
            </div>
        </template>
          <p>
            The length of time you take vitamins and supplements will depend on your individual
            needs and goals. If you are taking vitamins and supplements to treat a specific health
            condition, you may need to take them for a longer period of time.<br>
            If you are taking vitamins and supplements to improve your overall health, you may only
            need to take them for a short period of time. It is important to talk to your doctor to get
            their recommendations on how long you should take vitamins and supplements.
            </p>
          </AccordionTab>
        <AccordionTab>
          <template #header>
            <div class="text-center flex align-items-center">
              <span class="material-symbols-outlined mx-2 text-3xl">
                blood_pressure
                </span>
              <span>What are the side effects of vitamins and supplements?</span>
            </div>
        </template>
          <p>
            Most vitamins and supplements are safe when taken in the recommended dosage. It is
            important to remember that vitamins and supplements are not a substitute for a healthy
            diet and regular exercise. However, they can be a helpful way to improve your overall
            health and well-being.
            </p>
          </AccordionTab>
      </Accordion>
  </div>
    </div>
    <div class="w-full m-auto flex justify-content-center">
      <router-link to="/products"  @click="scrollToTop()" class="p-3 px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4">SHOP NOW</router-link>
    </div>
</div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rowdies&display=swap');
.kanitFont{
  font-family: 'Kanit', sans-serif !important;
  text-shadow: 0px 1px 4px white ;
}
.rating{
  display: flex;
  margin: 1vh 0;
  justify-content: center;
}
.nocolor{
  color: gold;
  margin: 0.2vh;
  cursor: pointer;
}

.reviewCard{
  width: 30%;
  background-color: #c5c3c58b;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 2vh;
  transition-duration: 0.3s;
}
.reviewCard:hover{
  width: 31%;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.632);
}
.shopNow{
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.367);
  margin: auto;
  transition-duration: 0.3s;
}
.sales{
  color: white !important;
  background-color: #30364b44;
  padding: 2vh;
  border-radius: 5px;
  text-shadow: 0px 0px 4px black;
  
}
.shopNow:hover{
  color: white !important;
  background-color: #30364bdd !important;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.367);
}
.ProductImage{
  position: relative;
  cursor: pointer;
  margin-bottom: 2vh;
  background-color: black;
  width: 310px;
  height: 260px;
  border-start-start-radius: 16px !important;
  border-start-end-radius: 16px !important;
}
.productt{
  width: 310px;
  height: 260px;
  opacity: 1;
  transition-duration: 0.3s;
  border-start-start-radius: 16px !important;
  border-start-end-radius: 16px !important;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.368);
}
.ProductImage:hover .productt{
  opacity: 0.5;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.829);
}
.appearOnHover{
  font-size: 28px;
  color: white;
  background-color: rgba(0, 0, 0, 0.649);
  padding: 1vh;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 45%;
  opacity: 0;
  transition-duration: 0.3s;
}
.ProductImage:hover .appearOnHover{
  opacity: 1;
}
.appearOnHover:hover{
  background-color: rgba(0, 0, 0, 0);
}
.AddToCart{
  background-color: #30364be2 !important;
  border-radius: 4px;
  margin: auto;
  text-align: center;
  color: white;
  cursor: pointer;
  transition-duration: 0.2s;
}
.AddToCart:hover{
  background-color: #00a650 !important;
  border-radius: 8px;
}
.CARD{
  width: fit-content;
  border: solid rgba(128, 128, 128, 0.09) 2px;
  border-radius: 4px;
  transition-duration: 0.3s;
}
.CARD:hover{
  border-radius: 8px;
  padding: 4.5vh !important;
  border: solid rgb(0, 0, 0) 2px;
}
.hoverIcon{
  cursor: default;
  padding: 2vh;
  font-size: 15vh !important;
  transition-duration: 0.3s;
}
.hoverIcon:hover{
  font-size: 17vh !important;
}
.aboutUs{
  transition-duration: 0.2s;
}
.aboutUs:hover{
  color: white !important;
  text-shadow: 0px 2px 5px black !important;
}
.WhiteHover{
  transition-duration: 0.2s;
}
.WhiteHover:hover{
  color: rgb(0, 0, 0) !important;
}
.marginnn{
  margin: 13vh 0;
}
.shopNowHover{
  border-radius: 2px;
  transition-duration: 0.2s;
}
.shopNowHover:hover{
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.782) !important;
}
@media screen and (max-width : 1000px){
  .reviewCard{
    width: fit-content;
    margin: 4vh;
  }
  .reviewCard:hover{
    width: fit-content;
  } 
}
@media screen and (max-width : 770px){
  .ResponsiveCarouselPg{
    top: 54% !important;
    left: 50% !important;
    width: 80% !important;    
    color: black !important;
  }
  .noneResp{
    display: none !important;
  }
  .ResponsiveCarouselShopNow{
    top: 57% !important;
    left: 50% !important;    
  }
}

@media screen and (max-width : 576px){
  .aboutUs{
    color: white !important;
    font-family: 'Kanit', sans-serif !important;
    text-shadow: 0px 1px 4px black !important;
  }
  .aboutUs:hover{
    color: rgba(0, 77, 192, 0.81) !important;
    text-shadow: 0px 1px 4px rgb(255, 255, 255) !important;
  }
  .noneForMob{
    display: none !important;
  }
  .MobCarouselImg{
    width: 170%; 
    overflow: hidden !important;
  }
  .Icons{
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
  }
  .shopNow{
    font-size: 11px !important;
    padding: 0vh !important;
  }
  .IconsImg{
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    margin: auto !important;
  }
  .IconsColumn{
    flex-direction: column !important;
  }
  .FAQ{
    flex-direction: column !important;
  }
  .faqImg{
    width: 90% !important;
    margin: auto;
  }
  .accordion{
    width: 90% !important;
  }
  .Mob-TextCenter{
    text-align: center !important;
  }
  .Mob-JustifyCenter{
    justify-content: center !important;
  }
 .Mob-left0{
   margin-left : 0 !important;
 }
 .MobBlock{
   display: block !important;
 }
 .Mobtop50{
   top: 50% !important;
 }
 .MobWidth100{
  width: 100% !important;
 }
 .fontSizeMob{
  font-size: 17px;
 }
 .textJustifyMob{
  text-align: justify !important;
 }
 .marginBottomMob{
  margin-bottom: 1vh !important;
 }
}
</style>