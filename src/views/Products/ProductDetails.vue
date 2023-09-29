<script setup lang="ts">
import Image from 'primevue/image';
import Rating from 'primevue/rating';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Carousel from 'primevue/carousel';
import {ref , onBeforeMount , onMounted} from 'vue'
import Breadcrumb from 'primevue/breadcrumb';
import ContactIcons from '@/components/ContactIcons.vue';
import ScrollPanel from 'primevue/scrollpanel';
import { useRouter } from 'vue-router';
import { AES, enc } from 'crypto-js';
import axios from 'axios';
import Loading from '../../components/Loading.vue'
import type { Ref } from 'vue';
import Button from 'primevue/button';

const { push , currentRoute } = useRouter();

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const loading = ref(true)
const RatingValue = ref(5)
const QuantityValue = ref(1)
const Authenticated = ref(false)
let token = localStorage.getItem('LF_Token')
const Product = ref()
const FeaturedProducts = ref()
const items : Ref<Array<any>> = ref([]);
let ProductId : number = parseInt(currentRoute.value.params.id as string)

const getProduct = async () => { 
    let response = await axios.get(`https://api-lifeformula.com/api/product/${ProductId}`);
    Product.value = response.data.product as any    
    Product.value.product_icons = JSON.parse(Product.value.product_icons)  
    items.value = [
        {label: 'products' , route: '/products', to:'/products'},
        {label: Product.value.categoryName},
        {label: Product.value.name},
    ];  
}

const getFeaturedProducts = async () => {
  let response = await axios.get('https://api-lifeformula.com/api/featured');
  let featured = response.data.Featured.filter((item:any) => item.id !== ProductId);
  FeaturedProducts.value = featured as any
  console.log(FeaturedProducts.value);
}

onBeforeMount(() => {
  if(token){
    Authenticated.value = true
    let decrypted_token = AES.decrypt(token , 'EncryptionKey_liformula24').toString(enc.Utf8)        
    axios.defaults.headers.common['Authorization'] = `Bearer ${decrypted_token}`
  }
  getProduct();
  getFeaturedProducts();
})

onMounted(() => {
    setTimeout(() => {
        loading.value = false
  }, 3500);
})

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
},
);

const cartLoading = ref(false)
const addToCart = (productId : number) => {
    isDialogVisible.value = true
    cartLoading.value = true
    let ProductFound : any = Product.value;
    ProductFound = {
        product : ProductFound
    }
    console.log(ProductFound);
    
    if(Authenticated.value == true){
        let request = {
            product_id : productId ,
            quantity : QuantityValue.value
        }
        axios.post('https://api-lifeformula.com/api/addToCart',request).then((result) => {
            console.log(result.data.message);
            cartLoading.value = false
         }).catch((err) => {
            console.log(err);
            
         });

    }
    else{
        let localCart = localStorage.getItem('LF-Cart');
        if(localCart){
            let decryptedCart = AES.decrypt(localCart , 'EncryptionKey_liformula24').toString(enc.Utf8)
            let parsedCart = JSON.parse(decryptedCart) 
            for (let index = 0; index < parsedCart.length; index++) {
                const item = parsedCart[index];
                if(item.product.id == productId){
                     cartLoading.value = false
                    return
                }
            }
            cartLoading.value = false
            ProductFound.quantity = QuantityValue.value
            parsedCart.push(ProductFound)
            parsedCart = JSON.stringify(parsedCart)
            let encryptedCart = AES.encrypt(parsedCart , 'EncryptionKey_liformula24').toString()
            localStorage.setItem('LF-Cart',encryptedCart)
        }
        else{
            cartLoading.value = false
            let cart : any = []
            ProductFound.quantity = QuantityValue.value
            cart.push(ProductFound);
            cart = JSON.stringify(cart)
            let encryptedCart = AES.encrypt(cart , 'EncryptionKey_liformula24').toString()
            localStorage.setItem('LF-Cart',encryptedCart)
        }
    }
}

const isDialogVisible = ref(false)
const OptionsValue = ref('HOW TO TAKE IT');
const options = ref(['HOW TO TAKE IT', 'INGREDIENTS']);
</script>
<template>
<div v-if="loading">
    <Loading />
</div>
<ContactIcons></ContactIcons>

<Dialog v-model:visible="isDialogVisible" modal header="Thank You!" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
    <div v-if="cartLoading" class="flex w-full justify-content-center">
        <div  class="m-auto text-center loadingio-spinner-double-ring-cm1ltjai5mu"><div class="ldio-ujurhm9bi0c">
            <div></div>
            <div></div>
            <div><div></div></div>
            <div><div></div></div>
        </div>
        </div>
    </div>
    <span v-else class="material-symbols-outlined text-6xl text-center my-2 m-auto flex justify-content-center cursor-pointer">
        task_alt
    </span>
    <h4 class="text-center p-2 my-2">Product Added To Cart Successfully!</h4>
    <template #footer>
        <Button class="textSmMob mt-2" label="Go To Cart" icon="pi pi-shopping-cart" @click="push('/cart'); scrollToTop()" text />
        <Button class="textSmMob mt-2" label="Continue Shopping" icon="pi pi-shopping-bag" @click="isDialogVisible = false" autofocus />
    </template>
</Dialog>

    <!-- HEADER IMAGE -->
    <div class="fadein animation-duration-2000 animation-iteration-1">
        <img src="../../assets/product-details-model.png" class="noneForMob w-full" alt="">
        <img src="../../assets/mobileModel.png" class="hidden MobBlock w-full mt-3" alt="">
    </div>

    <!-- Breadcrumb -->
    <div class="w-full m-auto flex justify-content-center p-4 MargAutoMob paddingMob">
        <Breadcrumb :home="home" :model="items" />
    </div>

    <!-- PRODUCT DETAILS -->
    <div v-if="Product" class="scalein animation-duration-2000 animation-iteration-1 p-2 lg:p-5 flex FlexColumnMob lg:flex-row md:flex-column sm:flex-column">
        <div class="lg:mx-5 sm:m-auto md:m-auto lg:m-1 MargAutoMob">
            <Image :src="Product.image" alt="Image" class="productDetailsImage" width="500" preview />
        </div>
        <div class="hidden lg:flex">
            <Divider layout="vertical" />
        </div>
        <div class="flex lg:hidden">
            <Divider layout="horizontal" />
        </div>
        <div class="w-9 m-auto lg:m-0 sm:text-center md:text-center lg:text-left textCenterMob width90">
            <h2 class="logoSecondaryColor my-2" style="letter-spacing: 2px;">{{ Product.name }}</h2>
            <p class="logoSecondaryColor my-2" style="letter-spacing: 2px;">{{ Product.categoryName }}</p>
            <div class="flex align-items-center md:justify-content-center sm:justify-content-center lg:justify-content-start justifyCenterMob">
                <p class="greenLogoColor mr-4 mb-0 text-xl pt-1">{{ Product.price }}$ <span style="color: grey; text-decoration: line-through;" v-if="Product.old_price" class="mx-2 text-sm">{{ Product.old_price }}$</span></p>
                <Rating v-model="RatingValue" readonly />
            </div>
            <p class="logoSecondaryColor my-2" v-if="Product.sale">Buy now and save {{ Product.sale }}%</p>
            <ScrollPanel style="width: 95%; height: 200px">
                <p class="w-10 my-3 darkGrey sm:m-auto md:m-auto lg:m-0 text-justify MargAutoMob textJustifyMob"> {{ Product.product_description }}
                </p>
            </ScrollPanel>
            <div class="flex FlexColumn sm:flex-column md:flex-column MargAutoMob lg:flex-row my-4 align-items-center lg:justify-content-between w-10 sm:m-auto md:m-auto lg:m-0">
                <InputNumber v-model="QuantityValue" showButtons buttonLayout="horizontal" class="productDetails inputNumberr" style="width: 2rem"
                decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus"
                 decrementButtonIcon="pi pi-minus" :min="1" :max="100" />
                 <h5 class="p-3 px-5 m-0 flex align-items-center AddToCart text-center justify-content-center" @click="addToCart(ProductId)">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                    shopping_cart
                </span>
                </h5>
            </div>
            <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue < 3">Price : {{(QuantityValue * Product.price).toFixed(2)}}$</p>
            <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue >= 3 && QuantityValue < 6 && Product.sale_on_3">
                Price : {{((QuantityValue * Product.price) - ( (QuantityValue * Product.price) * (Product.sale_on_3 / 100) )).toFixed(2)}}$ 
                <span class="ml-2 greenLogoColor text-sm">Save {{Product.sale_on_3 }} % on {{ QuantityValue }} pieces </span> 
                <span style="color: grey; text-decoration: line-through;" class="mx-2">{{ (QuantityValue * Product.price).toFixed(2) }}$</span>
            </p>
            <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue >= 6 && QuantityValue < 9 && Product.sale_on_6">
                Price : {{((QuantityValue * Product.price) - ( (QuantityValue * Product.price) * (Product.sale_on_6 / 100) )).toFixed(2)}}$ 
                <span class="ml-2 greenLogoColor text-sm">Save {{Product.sale_on_6 }} % on {{ QuantityValue }} pieces </span> 
                <span style="color: grey; text-decoration: line-through;" class="mx-2">{{ (QuantityValue * Product.price).toFixed(2) }}$</span>
            </p>
            <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue >= 9 && Product.sale_on_9">
                Price : {{((QuantityValue * Product.price) - ( (QuantityValue * Product.price) * (Product.sale_on_9 / 100) )).toFixed(2)}}$ 
                <span class="ml-2 greenLogoColor text-sm">Save {{Product.sale_on_9 }} % on {{ QuantityValue }} pieces </span> 
                <span style="color: grey; text-decoration: line-through;" class="mx-2">{{ (QuantityValue * Product.price).toFixed(2) }}$</span>
            </p>
            <div class="w-10 my-5 MobWidth100 flex justify-content-center align-items-center sm:m-auto md:m-auto lg:m-0 mgAuto mgtop">
                <SelectButton v-model="OptionsValue" :options="options" class="productDetails" aria-labelledby="basic" />
            </div>
            <div class="w-10 text-center sm:m-auto md:m-auto lg:m-0  mgAuto" v-if="OptionsValue=='HOW TO TAKE IT'">
                <p class="my-2">{{ Product.how_to_take_it }}</p>
            </div>
            <div class="w-10 text-center flex justify-content-center sm:m-auto md:m-auto lg:m-0 mgAuto" v-if="OptionsValue=='INGREDIENTS'">
                <img v-if="Product.ingredients_image" class="w-10 m-auto my-2" :src="Product.ingredients_image" alt="">
                <p v-else>{{ Product.ingredients_text }}</p>
            </div>
        </div>
    </div>

    <!-- PRODUCT ICONS -->
    <div v-if="Product.product_icons" class="productIcons p-5 w-full flex flex-wrap justify-content-center mt-5">
        <div class="text-center my-3 lg:mb-5 w-3 iconDiv"  v-for="(icon,index) in Product.product_icons.product_icons" :key="index">
            <span class="material-symbols-outlined text-white text-7xl iconnBorder">
                {{ icon.icon_name }}
            </span>
            <h3 class="productIconsFont text-center text-xl m-auto">{{ icon.icon_title }}</h3>
        </div>
    </div>

    <!-- Blog -->
    <div v-html="Product.product_article" v-if="Product.product_article" class="Blog w-12 lg:w-9 m-auto padding5 sm:p-2 md:p-3 lg:p-5">
       
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
            <p class="darkGrey w-full text-center m-auto">Email us at Info@lifeformula.us and we’ll be happy to help you.</p>
        </div>
    </div>

    <!-- PRODUCTS YOU MAY ALSO LIKE -->
    <div class="p-5 paddingMob">
        <h2 class="px-5 py-3 textCenterMob">Products You May Also Like</h2>
        <div class="m-auto noneForMob" style="width: 88%;">
            <Carousel :value="FeaturedProducts" :numVisible="3" :numScroll="1" circular :responsiveOptions="responsiveOptions" :autoplayInterval="4500">
                <template #item="slotProps">
                <div v-if="slotProps.data.id != ProductId" class="p-4 CARD m-auto" style="width: fit-content;">
                    <div class="ProductImage" @click="push(`/products/${slotProps.data.id}`); scrollToTop();">
                    <img :src="slotProps.data.image" class="productt" alt="">
                    <span class="material-symbols-outlined appearOnHover">
                        visibility
                    </span>
                    <h4 v-if="slotProps.data.sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">-{{ slotProps.data.sale }}%</h4>
                    </div>
                    <div class="px-2">
                        <p style="color: grey;" class="text-sm my-2">{{slotProps.data.categoryName}}</p>
                        <h3 class=" my-2">{{slotProps.data.name}}</h3>
                        <p class="text-sm greenLogoColor my-2">{{ slotProps.data.price }}$ <span style="color: grey; text-decoration: line-through;" v-if="slotProps.data.old_price" class="mx-2">{{slotProps.data.old_price}}$</span></p>
                        <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="addToCart(slotProps.data.id)">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                        shopping_cart
                    </span> </h4>
                    </div>
                </div>
                </template>
            </Carousel>
            </div>
            
            <!-- Best Selling Products for mobile -->
            <div class="m-auto sm:hidden lg:hidden md:hidden" style="width: 100%;">
            <Carousel :value="FeaturedProducts" :numVisible="1" :numScroll="1" orientation="vertical" circular verticalViewPortHeight="500px" 
            containerClass="w-full" contentClass="flex align-items-center">
                <template #item="slotProps">
                <div v-if="slotProps.data.id != ProductId" class="p-4 CARD m-auto" style="width: fit-content;">
                    <div class="ProductImage" @click="push(`/products/${slotProps.data.id}`); scrollToTop()">
                    <img :src="slotProps.data.image" class="productt" alt="">
                    <span class="material-symbols-outlined appearOnHover">
                        visibility
                    </span>
                    <h4 v-if="slotProps.data.sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">-{{ slotProps.data.sale }}%</h4>
                    </div>
                    <div class="px-2">
                        <p style="color: grey;" class="text-sm my-2">{{slotProps.data.categoryName}}</p>
                        <h3 class=" my-2">{{slotProps.data.name.split(' ').slice(0, 3).join(' ')}}</h3>
                        <p class="text-sm greenLogoColor my-2">{{ slotProps.data.price }} <span style="color: grey; text-decoration: line-through;" v-if="slotProps.data.old_price" class="mx-2">-{{slotProps.data.old_price}}%</span></p>
                        <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="addToCart(slotProps.data.id)">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                        shopping_cart
                    </span> </h4>
                    </div>
                </div>
                </template>
            </Carousel>
        </div>
    </div>
    </template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.p-component, .p-component * {
    box-sizing: border-box;
}

.p-hidden {
    display: none;
}

.p-hidden-space {
    visibility: hidden;
}

.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-reset {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    text-decoration: none;
    font-size: 100%;
    list-style: none;
}

.p-disabled, .p-disabled * {
    cursor: default !important;
    pointer-events: none;
    user-select: none;
}

.p-component-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overflow-hidden {
    overflow: hidden;
}

.p-unselectable-text {
    user-select: none;
}

.p-scrollbar-measure {
    width: 100px;
    height: 100px;
    overflow: scroll;
    position: absolute;
    top: -9999px;
}

@-webkit-keyframes p-fadein {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes p-fadein {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

input[type="button"],
input[type="submit"],
input[type="reset"],
input[type="file"]::-webkit-file-upload-button,
button {
    border-radius: 0;
}

.p-link {
	text-align: left;
	background-color: transparent;
	margin: 0;
	padding: 0;
	border: none;
    cursor: pointer;
    user-select: none;
}

.p-link:disabled {
	cursor: default;
}

/* Non vue overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity .1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity .1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-sr-only {
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    word-wrap: normal !important;
}

.p-badge {
    display: inline-block;
    border-radius: 10px;
    text-align: center;
    padding: 0 .5rem;
}

.p-overlay-badge {
    position: relative;
}

.p-overlay-badge .p-badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%,-50%);
    transform-origin: 100% 0;
    margin: 0;
}

.p-badge-dot {
    width: .5rem;
    min-width: .5rem;
    height: .5rem;
    border-radius: 50%;
    padding: 0;
}

.p-badge-no-gutter {
    padding: 0;
    border-radius: 50%;
}
.p-button {
    margin: 0;
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    vertical-align: bottom;
    text-align: center;
    overflow: hidden;
    position: relative;
}

.p-button-label {
    flex: 1 1 auto;
}

.p-button-icon-right {
    order: 1;
}

.p-button:disabled {
    cursor: default;
}

.p-button-icon-only {
    justify-content: center;
}

.p-button-icon-only .p-button-label {
    visibility: hidden;
    width: 0;
    flex: 0 0 auto;
}

.p-button-vertical {
    flex-direction: column;
}

.p-button-icon-bottom {
    order: 2;
}

.p-buttonset .p-button {
    margin: 0;
}

.p-buttonset .p-button:not(:last-child) {
    border-right: 0 none;
}

.p-buttonset .p-button:not(:first-of-type):not(:last-of-type) {
    border-radius: 0;
}

.p-buttonset .p-button:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.p-buttonset .p-button:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.p-buttonset .p-button:focus {
    position: relative;
    z-index: 1;
}
.p-checkbox {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    vertical-align: bottom;
    position: relative;
}

.p-checkbox.p-checkbox-disabled {
    cursor: default;
}

.p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.p-colorpicker-panel .p-colorpicker-color {
     background: transparent url("./images/color.png") no-repeat left top; 
}

.p-colorpicker-panel .p-colorpicker-hue {
    background: transparent url("./images/hue.png") no-repeat left top; 
}
.p-inputtext {
    margin: 0;
}

.p-fluid .p-inputtext {
    width: 100%;
}

/* InputGroup */
.p-inputgroup {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroup-addon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-inputgroup .p-float-label {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroup .p-inputtext,
.p-fluid .p-inputgroup .p-inputtext,
.p-inputgroup .p-inputwrapper,
.p-fluid .p-inputgroup .p-input {
    flex: 1 1 auto;
    width: 1%;
}

/* Floating Label */
.p-float-label {
    display: block;
    position: relative;
}

.p-float-label label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    margin-top: -.5rem;
    transition-property: all;
    transition-timing-function: ease;
    line-height: 1;
}

.p-float-label textarea ~ label {
    top: 1rem;
}

.p-float-label input:focus ~ label,
.p-float-label input.p-filled ~ label,
.p-float-label textarea:focus ~ label,
.p-float-label textarea.p-filled ~ label,
.p-float-label .p-inputwrapper-focus ~ label,
.p-float-label .p-inputwrapper-filled ~ label {
    top: -.75rem;
    font-size: 12px;
}

.p-float-label .input:-webkit-autofill ~ label {
    top: -20px;
    font-size: 12px;
}

.p-float-label .p-placeholder,
.p-float-label input::placeholder,
.p-float-label .p-inputtext::placeholder {
    opacity: 0;
    transition-property: all;
    transition-timing-function: ease;
}

.p-float-label .p-focus .p-placeholder,
.p-float-label input:focus::placeholder,
.p-float-label .p-inputtext:focus::placeholder {
    opacity: 1;
    transition-property: all;
    transition-timing-function: ease;
}

.p-input-icon-left,
.p-input-icon-right {
    position: relative;
    display: inline-block;
}

.p-input-icon-left > i,
.p-input-icon-left > svg,
.p-input-icon-right > i,
.p-input-icon-right > svg {
    position: absolute;
    top: 50%;
    margin-top: -.5rem;
}

.p-fluid .p-input-icon-left,
.p-fluid .p-input-icon-right {
    display: block;
    width: 100%;
}

.p-radiobutton {
    position: relative;
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    vertical-align: bottom;
}

.p-radiobutton.p-radiobutton-disabled {
    cursor: default;
}

.p-radiobutton-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.p-radiobutton-icon {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0) scale(.1);
    border-radius: 50%;
    visibility: hidden;
}

.p-radiobutton-box.p-highlight .p-radiobutton-icon {
    transform: translateZ(0) scale(1.0, 1.0);
    visibility: visible;
}
.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-ink {
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    transform: scale(0);
    pointer-events: none;
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

.p-ripple-disabled .p-ink {
    display: none !important;
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}

.p-tooltip {
    position:absolute;
    display:none;
    padding: .25em .5rem;
    max-width: 12.5rem;
}

.p-tooltip.p-tooltip-right,
.p-tooltip.p-tooltip-left {
    padding: 0 .25rem;
}

.p-tooltip.p-tooltip-top,
.p-tooltip.p-tooltip-bottom {
    padding:.25em 0;
}

.p-tooltip .p-tooltip-text {
   white-space: pre-line;
   word-break: break-word;
}

.p-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
}

.p-tooltip-right .p-tooltip-arrow {
    top: 50%;
    left: 0;
    margin-top: -.25rem;
    border-width: .25em .25em .25em 0;
}

.p-tooltip-left .p-tooltip-arrow {
    top: 50%;
    right: 0;
    margin-top: -.25rem;
    border-width: .25em 0 .25em .25rem;
}

.p-tooltip.p-tooltip-top {
    padding: .25em 0;
}

.p-tooltip-top .p-tooltip-arrow {
    bottom: 0;
    left: 50%;
    margin-left: -.25rem;
    border-width: .25em .25em 0;
}

.p-tooltip-bottom .p-tooltip-arrow {
    top: 0;
    left: 50%;
    margin-left: -.25rem;
    border-width: 0 .25em .25rem;
}



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