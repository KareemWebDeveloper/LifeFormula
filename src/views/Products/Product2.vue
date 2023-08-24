<script setup lang="ts">
import Image from 'primevue/image';
import Rating from 'primevue/rating';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import Carousel from 'primevue/carousel';
import {ref} from 'vue'
import Breadcrumb from 'primevue/breadcrumb';
import ContactIcons from '@/components/ContactIcons.vue';
import { useRouter } from 'vue-router';
const { push } = useRouter();
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const RatingValue = ref(5)
const QuantityValue = ref(1)
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
        breakpoint: '1050px',
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

const home = ref({
    icon: 'pi pi-home',
    to: '/',
});
const items = ref([
    {label: 'Products'},
    {label: 'Wellness Supplements'},
    {label: 'D3 50,000 IU'},
]);

const isDialogVisible = ref(false)
const OptionsValue = ref('HOW TO TAKE IT');
const options = ref(['HOW TO TAKE IT', 'INGREDIENTS']);
</script>
<template>
<ContactIcons></ContactIcons>

    <!-- HEADER IMAGE -->
    <div class="fadein animation-duration-2000 animation-iteration-1">
        <img src="../../assets/product-details-model.png" class="w-full" alt="">
    </div>

    <!-- Breadcrumb -->
    <div class="w-full m-auto flex justify-content-center p-4 MargAutoMob paddingMob">
        <Breadcrumb :home="home" :model="items" />
    </div>

    <!-- PRODUCT DETAILS -->
    <div class="scalein animation-duration-2000 animation-iteration-1 p-2 lg:p-5 flex FlexColumnMob lg:flex-row md:flex-column sm:flex-column">
        <div class="lg:mx-5 sm:m-auto md:m-auto lg:m-1 MargAutoMob">
            <Image src="https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/GreenCoffee.jpg" alt="Image" class="productDetailsImage" width="500" preview />
        </div>
        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>
        <div class="flex lg:hidden">
            <Divider layout="horizontal" />
        </div>
        <div class="w-9 m-auto lg:m-0 sm:text-center md:text-center lg:text-left textCenterMob width90">
            <h2 class="logoSecondaryColor my-2" style="letter-spacing: 2px;">Green Coffee Bean Extract 800 mg</h2>
            <p class="logoSecondaryColor my-2" style="letter-spacing: 2px;">Wellness Supplements</p>
            <div class="flex align-items-center md:justify-content-center sm:justify-content-center lg:justify-content-start justifyCenterMob">
                <p class="greenLogoColor mr-4 mb-0 text-xl pt-1">13.90$</p>
                <Rating v-model="RatingValue" readonly />
            </div>
            <p class="w-10 my-3 darkGrey sm:m-auto md:m-auto lg:m-0 MargAutoMob textJustifyMob">Green coffee bean extract is a natural supplement that has been shown to promote
                weight loss and improve overall health. It is made from the unroasted beans of the
                coffee plant, which contain a higher concentration of chlorogenic acid than roasted
                beans. Chlorogenic acid is a powerful antioxidant that has been shown to boost
                metabolism, reduce the absorption of carbohydrates, and regulate blood sugar levels.
            </p>
            <div class="flex FlexColumn sm:flex-column md:flex-column MargAutoMob lg:flex-row my-4 align-items-center lg:justify-content-between w-10 sm:m-auto md:m-auto lg:m-0">
                <InputNumber v-model="QuantityValue" showButtons buttonLayout="horizontal" class="productDetails inputNumberr" style="width: 2rem"
                decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus"
                 decrementButtonIcon="pi pi-minus" :min="1" :max="100" />
                 <h5 class="p-3 px-5 m-0 flex align-items-center AddToCart text-center justify-content-center" @click="isDialogVisible = true">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                    shopping_cart
                </span>
                </h5>
            </div>
            <p class="sm:text-center md:text-center lg:text-left">Price : {{(QuantityValue * 13.90).toFixed(2)}}$</p>
            <div class="w-10 my-5 flex justify-content-center align-items-center sm:m-auto md:m-auto lg:m-0 mgAuto mgtop">
                <SelectButton v-model="OptionsValue" :options="options" class="productDetails" aria-labelledby="basic" />
            </div>
            <div class="w-10 text-center sm:m-auto md:m-auto lg:m-0  mgAuto" v-if="OptionsValue=='HOW TO TAKE IT'">
                <p>One tablet daily or as directed by a healthcare professional. This product should be used with a
                    sensible diet and exercise program</p>
            </div>
            <div class="w-7 lg:w-10 text-center flex justify-content-center sm:m-auto md:m-auto lg:m-0 mgAuto" v-if="OptionsValue=='INGREDIENTS'">
                <img src="../../assets/greenCoffeeIngredients.png" class="width80" alt="">
            </div>
        </div>
    </div>

    <!-- PRODUCT ICONS -->
    <div class="productIcons p-5 w-full flex flex-wrap justify-content-center mt-5">
        <div class="text-center mx-3 my-3 lg:mb-5">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                scale
            </span>
            <h2 class="productIconsFont">Weight Loss</h2>
        </div>

        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                heart_check
            </span>
            <h2 class="productIconsFont">Cardiovascular Health</h2>
        </div>

        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                ecg
            </span>
            <h2 class="productIconsFont">Lower Blood Pressure</h2>
        </div>

        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                glucose
            </span>
            <h2 class="productIconsFont">Blood Sugar Regulation</h2>
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                sports_gymnastics
            </span>
            <h2 class="productIconsFont">Energy Boost</h2>
        </div>

        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                add_reaction
            </span>
            <h2 class="productIconsFont">Skin Health</h2>
        </div>
    </div>

    <!-- PRODUCTS YOU MAY ALSO LIKE -->
    <div class="p-5 paddingMob">
        <h2 class="px-5 py-3">Products You May Also Like</h2>
        <div class="m-auto" style="width: 100%;">
            <Carousel :value="Featured" :numVisible="3" :numScroll="1" circular :responsiveOptions="responsiveOptions" :autoplayInterval="4500">
              <template #item="slotProps">
                <div class="p-4 CARD m-auto" style="width: fit-content;">
                  <div class="ProductImage" @click="push(`/products/${slotProps.data.productId}`); scrollToTop()">
                    <img :src="slotProps.data.productImage" class="productt" alt="">
                    <span class="material-symbols-outlined appearOnHover">
                      visibility
                    </span>
                    <h4 style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3" v-if="slotProps.data.Sale"> {{ slotProps.data.Sale }}</h4>
                  </div>
                  <div class="px-2">
                      <p style="color: grey;" class="text-sm my-2">{{slotProps.data.CategoryName}}</p>
                      <h3 class=" my-2">{{slotProps.data.productName}}</h3>
                      <p class="text-sm greenLogoColor my-2">{{ slotProps.data.Price }} <span style="color: grey; text-decoration: line-through;" class="mx-2" v-if="slotProps.data.OldPrice">{{slotProps.data.OldPrice}}</span></p>
                      <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="isDialogVisible = true">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                        shopping_cart
                    </span> </h4>
                  </div>
                </div>
              </template>
          </Carousel>
          </div>
    </div>

    <!-- Shipping buying icons  -->
    <div class="p-5 w-full flex flex-wrap justify-content-center FlexColumnMob" style="background-color: #f2f4f7d8;">
        <div class="w-5 lg:w-3 flex flex-column justify-content-center text-center mx-2 my-3 mgAuto">
            <span class="material-symbols-outlined text-7xl">
                local_shipping
            </span>
            <h2 class="productIconsFont">Fast Shipping</h2>
            <p class="darkGrey w-full text-center m-auto">Delivered within 2-3 business days for a flat rate of $6.99 and free shipping over $59.</p>
        </div>
        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>
        <div class="w-5 lg:w-3 flex flex-column justify-content-center text-center mx-2 my-3 mgAuto">
            <span class="material-symbols-outlined text-7xl">
                currency_exchange
            </span>
            <h2 class="productIconsFont">Easy Returns</h2>
            <p class="darkGrey w-full text-center m-auto">If you’re not satisfied, you can return the product anytime within 30 days.</p>
        </div>
        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>
        <div class="w-5 lg:w-3 flex flex-column justify-content-center text-center mx-2 my-3 mgAuto">
            <span class="material-symbols-outlined text-7xl">
                forward_to_inbox
            </span>
            <h2 class="productIconsFont">Questions?</h2>
            <p class="darkGrey w-full text-center m-auto">Email us at hello@lifeFormula.com and we’ll be happy to help you.</p>
        </div>
    </div>

    <div class="Blog w-12 lg:w-9 m-auto padding5 sm:p-2 md:p-3 lg:p-5">
        <div class="my-2">
            <h2 class="text-center">The Buzz About Coffee Bean Supplements</h2>
            <p class="m-auto text-center p-2 productIconsFont">In the fast-paced world we live in, finding ways to boost our energy and focus is a
                 top priority. Amidst the hustle and bustle, coffee has always been a trusted companion. But what if we told you that the benefits 
                 of coffee could extend beyond your morning cup? Enter coffee bean supplements – a trending addition to the world of vitamins and 
                 supplements. Unveiling the Power of Coffee Beans 
            </p>
            <p class="m-auto text-center p-2 py-3 productIconsFont">
                Coffee beans are more than just the beans that brew your morning pick-me-up. They are rich in a variety of compounds,
                including antioxidants, chlorogenic acid, and caffeine. These elements contribute to the potential health benefits 
                associated with coffee consumption.
            </p>
        </div>
        <hr>
        <div class="my-4">
            <h2 class="text-center my-2">Why Choose Coffee Bean Supplements?</h2>
            <p class="m-auto text-justify p-3 productIconsFont"><span class="font-bold text-md">Antioxidant Boost :</span> Antioxidants play a crucial role in combating free radicals and 
                oxidative stress in the body. Coffee beans are loaded with these powerful antioxidants, which can help protect your cells from 
                damage and contribute to overall well-being.
            </p>
            <p class="m-auto text-justify p-3 productIconsFont"><span class="font-bold text-md">Metabolism Support :</span> Some studies suggest that the 
                chlorogenic acid found in coffee beans may have a positive effect on metabolism and weight management. This can be particularly 
                appealing to those looking to support their fitness goals.
            </p>
            <p class="m-auto text-justify p-3 productIconsFont"><span class="font-bold text-md">Enhanced Cognitive Function :</span> Coffee's caffeine content is known to provide
                 a temporary energy boost and improve mental alertness. Coffee bean supplements offer a more controlled and sustained release of 
                 caffeine, potentially enhancing cognitive function and focus throughout the day.
            </p>
            <p class="m-auto text-justify p-3 productIconsFont"><span class="font-bold text-md">Heart Health :</span> CResearch suggests that coffee consumption 
                may be associated with a reduced risk of certain cardiovascular conditions. The compounds found in coffee beans might contribute to maintaining a healthy heart.
            </p>
            <hr>
            <p class="m-auto my-3 text-center p-2 productIconsFont">Coffee bean supplements offer a convenient and controlled way to tap into 
                the potential health benefits of coffee beans beyond your morning cup of joe. From antioxidant support to enhanced cognitive
                function, these supplements are garnering attention for good reason. As the world of wellness evolves, coffee bean supplements
                 stand as a testament to our ongoing exploration of nature's treasures in the pursuit of a healthier, more vibrant life.
            </p>
        </div>
    </div>
    </template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.productDetailsImage img{
    border-radius: 10px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.593);
}
.iconnBorder{
    border: 1px solid rgba(0, 0, 0, 0.385);
    background-color: #00a650d0;
    border-radius: 50%;
    padding: 1.5vh;
    margin-bottom: 1.5vh ;
    font-weight: bold;
    cursor: default;
    transition-duration: 0.3s;
}
.iconnBorder:hover{
    padding: 2vh;
}
.p-rating-cancel{
    display: none !important;
}
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
    color: #00a650;
}
.productDetails .p-inputtext {
    width: 8vh !important;
    text-align: center !important;
}
.productIcons{
    background-color: #00415a5b;
}
.productIconsFont{
font-family: 'Bricolage Grotesque', sans-serif !important;
}
@media screen and (max-width : 1150px){
    .FlexColumn{
        flex-direction: column !important;
    }
    .inputNumberr{
        width: 70% !important;
        margin: 1.5vh auto;
    }    
}
@media screen and (max-width : 1000px){
.inputNumberr{
    width: 100% !important;
    margin: 1.5vh auto;
}    
}
@media screen and (max-width : 575px){
    .width80{
        width: 100% !important;
        margin: auto !important;
    }
    .FlexColumnMob{
        flex-direction: column !important;
        padding: 1vh !important;
    }
    .MargAutoMob{
        width: 100% !important;
        margin: auto !important;
    }
    .MargAutoMob img{
        width: 88% !important;
        margin: auto;
        display: flex;
        justify-content: center;
    }
    .width90{
        width: 92% !important;
    }
    .textCenterMob{
        text-align: center;
    }
    .textJustifyMob{
        text-align: justify;
        margin: 1vh auto !important;
    }
    .justifyCenterMob{
        justify-content: center;
    }
    .paddingMob{
        padding: 0.8vh !important;
    }
    .mgAuto{
        margin: 1vh auto !important;
    }
    .mgtop{
        margin-top: 3vh !important;
    }
}
</style>