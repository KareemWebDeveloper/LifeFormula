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
import ScrollPanel from 'primevue/scrollpanel';

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
            <Image src="https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/Mockup%20with%20Golden%20Flip%20Top.jpg" alt="Image" class="productDetailsImage" width="500" preview />
        </div>
        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>
        <div class="flex lg:hidden">
            <Divider layout="horizontal" />
        </div>
        <div class="w-9 m-auto lg:m-0 sm:text-center md:text-center lg:text-left textCenterMob width90">
            <h2 class="logoSecondaryColor my-2" style="letter-spacing: 2px;">Raspberry Ketone</h2>
            <p class="logoSecondaryColor my-2" style="letter-spacing: 2px;">Wellness Supplements</p>
            <div class="flex align-items-center md:justify-content-center sm:justify-content-center lg:justify-content-start justifyCenterMob">
                <p class="greenLogoColor mr-4 mb-0 text-xl pt-1">7.20$</p>
                <Rating v-model="RatingValue" readonly />
            </div>
            <ScrollPanel style="width: 100%; height: 200px">
                <p class="w-10 my-3 darkGrey sm:m-auto md:m-auto lg:m-0 MargAutoMob textJustifyMob">Raspberry ketones are a natural compound found in raspberries. They have been
                    shown to have a number of health benefits, including: <br> 
                    ● Weight loss: Raspberry ketones can help to boost metabolism and burn fat. They
                    have been shown to help reduce the accumulation of fat around the abdominal
                    organs and enhance fat burning efficiency. <br>
                    ● Anti-obesity: Raspberry ketones can help to suppress appetite and reduce
                    cravings. They may also help to improve insulin sensitivity, which can help with
                    weight loss.<br>
                    ● Anti-inflammatory: Raspberry ketones have been shown to have anti-
                    inflammatory properties. This can help to reduce inflammation throughout the
                    body, which can improve overall health and well-being.<br>
                    ● Cardiovascular health: Raspberry ketones may help to improve cardiovascular
                    health. They have been shown to lower blood pressure and cholesterol levels.<br>
                    ● Other benefits: Raspberry ketones may also help to improve skin health, hair
                    growth, and cognitive function.
                </p>
            </ScrollPanel>
            <div class="flex FlexColumn sm:flex-column md:flex-column MargAutoMob lg:flex-row my-4 align-items-center lg:justify-content-between w-10 sm:m-auto md:m-auto lg:m-0">
                <InputNumber v-model="QuantityValue" showButtons buttonLayout="horizontal" class="productDetails inputNumberr" style="width: 2rem"
                decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus"
                 decrementButtonIcon="pi pi-minus" :min="1" :max="100" />
                 <h5 class="p-3 px-5 m-0 flex align-items-center AddToCart text-center justify-content-center" @click="isDialogVisible = true">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                    shopping_cart
                </span>
                </h5>
            </div>
            <p class="sm:text-center md:text-center lg:text-left">Price : {{(QuantityValue * 22.99).toFixed(2)}}$</p>
            <div class="w-10 my-5 flex justify-content-center align-items-center sm:m-auto md:m-auto lg:m-0 mgAuto mgtop">
                <SelectButton v-model="OptionsValue" :options="options" class="productDetails" aria-labelledby="basic" />
            </div>
            <div class="w-10 text-center sm:m-auto md:m-auto lg:m-0  mgAuto" v-if="OptionsValue=='HOW TO TAKE IT'">
                <p>For adults, take one (1) capsule daily, preferably with a meal.</p>
            </div>
            <div class="w-10 text-center flex justify-content-center sm:m-auto md:m-auto lg:m-0 mgAuto" v-if="OptionsValue=='INGREDIENTS'">
                <!-- <img src="../../assets/greenCoffeeIngredients.png" alt=""> -->
            </div>
        </div>
    </div>

    <!-- PRODUCT ICONS -->
    <div class="productIcons p-5 w-full flex flex-wrap justify-content-center mt-5">
        <div class="text-center mx-3 my-3 lg:mb-5 w-3 iconDiv">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                scale
            </span>
            <h3 class="productIconsFont">Weight Loss</h3>
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5 w-3 iconDiv">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                heart_check
            </span>
            <h3 class="productIconsFont">Cardiovascular Health</h3>
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5 w-3 iconDiv">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                immunology
            </span>
            <h3 class="productIconsFont">Anti-inflammatory</h3>
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5 w-3 iconDiv">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                dermatology
            </span>
            <h3 class="productIconsFont">Hair Growth</h3>
        </div>

        <div class="text-center mx-3 my-3 lg:mb-5 w-3 iconDiv">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                psychology
            </span>
            <h3 class="productIconsFont">Cognitive Function Support</h3>
        </div>
        <div class="text-center mx-3 my-3 lg:mb-5 w-3 iconDiv">
            <span class="material-symbols-outlined text-white text-8xl iconnBorder">
                add_reaction
            </span>
            <h3 class="productIconsFont">Skin Health</h3>
        </div>
    </div>

    <!-- PRODUCTS YOU MAY ALSO LIKE -->
    <div class="p-5 paddingMob">
        <h2 class="px-5 py-3">Products You May Also Like</h2>
        <div class="m-auto" style="width: 100%;">
            <Carousel :value="Featured" :numVisible="3" :numScroll="1" circular :responsiveOptions="responsiveOptions" :autoplayInterval="4500">
              <template #item="slotProps">
                <div class="p-4 CARD m-auto" style="width: fit-content;">
                  <div class="ProductImage">
                    <img :src="slotProps.data.productImage" class="productt" alt="">
                    <span class="material-symbols-outlined appearOnHover">
                      visibility
                    </span>
                    <h4 style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3" v-if="slotProps.data.Sale">{{ slotProps.data.Sale }}</h4>
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

    <!-- Blog -->
    <div class="Blog w-12 lg:w-9 m-auto padding5 sm:p-2 md:p-3 lg:p-5">
        <div class="my-2">
            <h2 class="text-center">Why Should You Consider Raspberry Ketones Supplements?</h2>
            <p class="m-auto text-center p-2 productIconsFont">In the world of dietary supplements, a new contender has emerged that's been generating quite a buzz lately – <span style="color: rgba(255, 38, 0, 0.923);">Raspberry Ketones</span>. These natural compounds,
                responsible for the distinctive aroma of raspberries, have garnered attention for their potential health benefits. While the hype can sometimes make it difficult to discern fact from fiction, it's 
                important to take a closer look at the science behind Raspberry Ketones to determine whether they deserve a spot in your supplement routine.
            </p>
        </div>
        <div class="my-4">
            <h2 class="text-center my-2">What Are Raspberry Ketones?</h2>
            <p class="m-auto text-center p-2 productIconsFont"><span style="color: rgba(255, 38, 0, 0.923);">Raspberry Ketones</span> are natural phenolic compounds found in red raspberries, peaches, grapes, and other fruit. Their distinct aroma
                has made them popular in the fragrance and food industries. In recent times, they've gained popularity as a dietary supplement due
                to claims of their potential benefits for weight loss and metabolism support.
            </p>
            <div class="my-4">
                <h4>Understanding the Hype: Weight Loss Claims</h4>
                <p class="m-auto text-justify p-2 productIconsFont">
                    One of the primary reasons behind the excitement surrounding <span style="color: rgba(255, 38, 0, 0.923);">Raspberry Ketones</span> is their weight loss benefits. The idea 
                    is that these compounds can help increase the breakdown of fat within cells, making it easier for the body to burn 
                    stored fat for energy. This concept has led to Raspberry Ketones being considered a "miracle" fat-burning supplement.
                    In addition to weight loss, raspberry ketones may also have other potential health benefits. Some studies have shown
                    that they may help to improve blood sugar control, reduce inflammation, and protect against cancer. However, more 
                    research is needed to confirm these findings.
                </p>
            </div>
            <div class="my-3">
                <h4>The Science Behind Raspberry Ketones</h4>
                <p class="m-auto text-justify p-2 productIconsFont">
                    Studies have suggested that <span style="color: rgba(255, 38, 0, 0.923);">Raspberry Ketones</span> help increase the breakdown of fat and regulate metabolism. Raspberry ketones work by 
                    increasing the activity of adiponectin, a hormone that plays a role in metabolism. Adiponectin helps to regulate blood sugar levels
                    and fat breakdown. Studies have shown that raspberry ketones can help to increase adiponectin levels in the body.
                </p>
            </div>
            <div class="my-3">
                <h4>The Importance of a Holistic Approach</h4>
                <p class="m-auto text-justify p-2 productIconsFont">
                    <span style="color: rgba(255, 38, 0, 0.923);">Raspberry Ketones</span> show promise in aiding weight loss, yet it's important to remember that no single supplement can
                    replace the importance of a balanced diet and regular exercise. 
                </p>
            </div>
            <div class="my-3">
                <h4>Considerations and Caution</h4>
                <p class="m-auto text-justify p-2 productIconsFont">
                    Before adding any new supplement to your routine, it's essential to consult with a healthcare professional, especially if you have underlying health conditions or are taking medications. Here are some additional tips for taking raspberry ketones safely:
                    Choose a high-quality product from a reputable manufacturer.
                    Abide by the recommended dosage by the manufacturer.
                    Take <span style="color: rgba(255, 38, 0, 0.923);">Raspberry Ketones</span> with food to reduce the risk of side effects.
                </p>
            </div>
            <p class="m-auto text-center p-2 productIconsFont">As the field of nutrition and supplementation continues to evolve, staying informed and making well-informed decisions
                 is key. Raspberry Ketones combined with a holistic approach to health and well-being hold promise of significant weight loss and enhanced metabolism.</p>
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
@media screen and (max-width : 750px){
.productIcons{
    flex-wrap: nowrap !important;
    flex-direction: column !important;
    justify-content: center !important;
}    
.iconDiv{
    margin: 0 !important;
    padding: 0 !important;
    margin: 2vh auto !important;
    text-align: center !important;
    width: 100% !important;
}
}

@media screen and (max-width : 575px){
    .FlexColumnMob{
        flex-direction: column !important;
        padding: 1vh !important;
    }
    .padding5{
        padding: 3vh !important;
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