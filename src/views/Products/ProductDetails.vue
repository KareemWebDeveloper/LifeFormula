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
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        location.reload()
    }, 300);

}

const loading = ref(true)
const dialogHeader = ref('Thank You!')
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
        {label: Product.value.categoryName , route: '/products', to:'/products' },
        {label: Product.value.name.split(' ').slice(0, 2).join(' ')},
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
  }, 1500);
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
    if(Product.value.count == 0){
        cartLoading.value = false
        dialogHeader.value = 'Sorry'
        return
    }
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

const contactUs = () => {
    isDialogVisible.value = false
    let contactButton = document.getElementById('contactUsButton');
    contactButton!.click();
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

<Dialog v-model:visible="isDialogVisible" modal :header="dialogHeader" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
    <div v-if="cartLoading" class="flex w-full justify-content-center">
        <div  class="m-auto text-center loadingio-spinner-double-ring-cm1ltjai5mu"><div class="ldio-ujurhm9bi0c">
            <div></div>
            <div></div>
            <div><div></div></div>
            <div><div></div></div>
        </div>
        </div>
    </div>
    <div v-else-if="Product.count == 0">
        <span class="material-symbols-outlined text-6xl text-center my-2 m-auto flex justify-content-center cursor-pointer" style="color: rgba(224, 8, 8, 0.875);">
            error
        </span>
        <h4 class="text-center p-2 my-2">This Product is out of stock right now</h4>
    </div>
    <div v-else>
        <span class="material-symbols-outlined greenLogoColor text-6xl text-center my-2 m-auto flex justify-content-center cursor-pointer">
            task_alt
        </span>
        <h4 class="text-center p-2 my-2">Product Added To Cart Successfully!</h4>
    </div>
    <template #footer>
        <Button v-if="Product.count == 0" class="textSmMob mt-2" label="Contact Us" icon="pi pi-comment" @click="contactUs()" autofocus />
        <div v-if="!cartLoading && Product.count > 0">
            <Button class="textSmMob mt-2" label="Go To Cart" icon="pi pi-shopping-cart" @click="push('/cart'); scrollToTop()" text />
            <Button class="textSmMob mt-2" label="Continue Shopping" icon="pi pi-shopping-bag" @click="isDialogVisible = false" autofocus />
        </div>
    </template>
</Dialog>

    <!-- HEADER IMAGE -->
    <div class="fadein animation-duration-2000 animation-iteration-1">
        <img src="../../assets/product-details-model.png" class="noneForMob w-full" alt="">
        <img src="../../assets/mobileModel.png" class="hidden MobBlock w-full mt-3" alt="">
    </div>

    <!-- Breadcrumb -->
    <div class="w-full m-auto flex justify-content-center p-4 MargAutoMob padding-1-breadcrumbs">
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
                <p class="greenLogoColor mr-4 mb-0 text-xl pt-1">${{ Product.price }} <span style="color: grey; text-decoration: line-through;" v-if="Product.old_price" class="mx-2 text-sm">${{ Product.old_price }}</span></p>
                <Rating v-model="RatingValue" readonly />
            </div>
            <p class="logoSecondaryColor my-2" v-if="Product.sale">Buy now and save {{ Product.sale }}%</p>
            <ScrollPanel style="width: 100%; height: 200px">
                <!-- <p class="w-10 my-3 darkGrey sm:m-auto md:m-auto lg:m-0 text-justify MargAutoMob textJustifyMob"> {{ Product.product_description }}
                </p> -->
                <div v-html="Product.product_description" class="w-10 my-3 darkGrey sm:m-auto md:m-auto lg:m-0 text-justify MargAutoMob textJustifyMob">
                </div>
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
            <div v-if="Product.count > 0">
                <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue < 3">Price : ${{(QuantityValue * Product.price).toFixed(2)}}</p>
                <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue >= 3 && QuantityValue < 6 && Product.sale_on_3">
                    Price : ${{((QuantityValue * Product.price) - ( (QuantityValue * Product.price) * (Product.sale_on_3 / 100) )).toFixed(2)}} 
                    <span class="ml-2 greenLogoColor text-sm">Save {{Product.sale_on_3 }} % on {{ QuantityValue }} pieces </span> 
                    <span style="color: grey; text-decoration: line-through;" class="mx-2">{{ (QuantityValue * Product.price).toFixed(2) }}$</span>
                </p>
                <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue >= 6 && QuantityValue < 9 && Product.sale_on_6">
                    Price : ${{((QuantityValue * Product.price) - ( (QuantityValue * Product.price) * (Product.sale_on_6 / 100) )).toFixed(2)}} 
                    <span class="ml-2 greenLogoColor text-sm">Save {{Product.sale_on_6 }} % on {{ QuantityValue }} pieces </span> 
                    <span style="color: grey; text-decoration: line-through;" class="mx-2">${{ (QuantityValue * Product.price).toFixed(2) }}</span>
                </p>
                <p class="sm:text-center md:text-center lg:text-left my-2" v-if="QuantityValue >= 9 && Product.sale_on_9">
                    Price : ${{((QuantityValue * Product.price) - ( (QuantityValue * Product.price) * (Product.sale_on_9 / 100) )).toFixed(2)}}
                    <span class="ml-2 greenLogoColor text-sm">Save {{Product.sale_on_9 }} % on {{ QuantityValue }} pieces </span> 
                    <span style="color: grey; text-decoration: line-through;" class="mx-2">${{ (QuantityValue * Product.price).toFixed(2) }}</span>
                </p>
            </div>
            <div v-else-if="QuantityValue > 1">
                <p style="color: rgba(224, 8, 8, 0.875);" class="my-2" >Sorry this product is out of stock right now!</p>
            </div>
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
    <div v-if="Product && Product.product_icons" class="productIcons p-5 w-full flex flex-wrap justify-content-center mt-5">
        <div class="text-center my-3 lg:mb-5 w-3 iconDiv"  v-for="(icon,index) in Product.product_icons.product_icons" :key="index">
            <span class="material-symbols-outlined text-white text-7xl iconnBorder">
                {{ icon.icon_name }}
            </span>
            <h3 class="productIconsFont text-center text-base md:text-xl m-auto">{{ icon.icon_title }}</h3>
        </div>
    </div>

    <!-- Blog -->
    <div v-html="Product.product_article" v-if="Product && Product.product_article" class="Blog w-12 lg:w-9 m-auto padding5 sm:p-2 md:p-3 lg:p-5">
       
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
                        <p style="color: grey;" class="text-sm my-2" @click="push(`/products/${slotProps.data.id}`); scrollToTop()">{{slotProps.data.categoryName}}</p>
                        <h3 class=" my-2" @click="push(`/products/${slotProps.data.id}`); scrollToTop()">{{slotProps.data.name}}</h3>
                        <p class="text-sm my-2" :class="{'greenLogoColor' : slotProps.data.old_price , 'grey' : !slotProps.data.old_price}">${{ slotProps.data.price }} <span style="color: grey; text-decoration: line-through;" v-if="slotProps.data.old_price" class="mx-2">${{slotProps.data.old_price}}</span></p>
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
                        <p style="color: grey;" class="text-sm my-2" @click="push(`/products/${slotProps.data.id}`); scrollToTop()">{{slotProps.data.categoryName}}</p>
                        <h3 class=" my-2" @click="push(`/products/${slotProps.data.id}`); scrollToTop()">{{slotProps.data.name.split(' ').slice(0, 3).join(' ')}}</h3>
                        <p class="text-sm my-2" :class="{'greenLogoColor' : slotProps.data.old_price , 'grey' : !slotProps.data.old_price}">{{ slotProps.data.price }} <span style="color: grey; text-decoration: line-through;" v-if="slotProps.data.old_price" class="mx-2">-{{slotProps.data.old_price}}%</span></p>
                        <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="addToCart(slotProps.data.id)">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                        shopping_cart
                    </span></h4>
                    </div>
                </div>
                </template>
            </Carousel>
            </div>
        </div>
                <!-- Shipping buying icons  -->
                <div class="p-5 w-full flex flex-wrap justify-content-center FlexColumnMob" style="background-color: #f2f4f7d8;">
                    <div class="w-11 lg:w-3 flex flex-column justify-content-center text-center mx-2 my-3 mgAuto">
                        <span class="material-symbols-outlined text-7xl">
                            local_shipping
                        </span>
                        <h2 class="productIconsFont">Fast Shipping</h2>
                        <p class="darkGrey w-full text-center m-auto">Delivered within 2-3 business days for a flat rate of $6.99 and free shipping over $59.</p>
                    </div>
                    <div class="hidden lg:flex">
                        <Divider layout="vertical" />
                    </div>
                    <div class="w-11 lg:w-3 flex flex-column justify-content-center text-center mx-2 my-3 mgAuto">
                        <span class="material-symbols-outlined text-7xl">
                            currency_exchange
                        </span>
                        <h2 class="productIconsFont">Easy Returns</h2>
                        <p class="darkGrey w-full text-center m-auto">If you’re not satisfied, you can return the product anytime within 30 days.</p>
                    </div>
                    <div class="hidden lg:flex">
                        <Divider layout="vertical" />
                    </div>
                    <div class="w-11 lg:w-3 flex flex-column justify-content-center text-center mx-2 my-3 mgAuto">
                        <span class="material-symbols-outlined text-7xl">
                            forward_to_inbox
                        </span>
                        <h2 class="productIconsFont">Questions?</h2>
                        <p class="darkGrey w-full text-center m-auto">Email us at Info@lifeformula.us and we’ll be happy to help you.</p>
                    </div>
                </div>
    </template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.p-scrollpanel-content{
    width: 100%;
}
.p-breadcrumb-list{
    margin: 0;
    padding: 1vh;
}
.p-menuitem-link{
    text-decoration: none;
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
    flex-wrap: wrap !important;
    justify-content: center !important;
    padding: 5vh 1vh !important;
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
    .iconDiv{
        margin: 0 !important;
        padding: 0 !important;
        margin: 2vh auto !important;
        text-align: center !important;
        width: 45% !important;
    }
    ul{
        padding-left: 1rem;
    }
    .p-breadcrumb{
        padding: 1vh 0 !important;
    }
    .padding-1-breadcrumbs {
        padding: 2vh 0.8vh !important;
    }
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
        width: 98% !important;
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