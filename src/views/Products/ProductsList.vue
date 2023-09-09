<script setup lang="ts">
import DataView from 'primevue/dataview';
import { ref , onMounted , onBeforeMount , watch } from 'vue';
import Skeleton from 'primevue/skeleton';
import Breadcrumb from 'primevue/breadcrumb';
import InputText from 'primevue/inputtext';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'   // optional
import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import ContactIcons from '@/components/ContactIcons.vue';
import axios from 'axios';
const { push } = useRouter();
import { AES, enc } from 'crypto-js';
import type { Ref } from 'vue';

type layoutType = "grid" | "list" | undefined
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
const isDialogVisible = ref(false)
const selectedCategories : Ref<Array<any>> = ref([])
const loading = ref(true)
const Slogan = ref(false)
const layout : Ref<layoutType> = ref('grid')
const SearchValue = ref()
let productTmp : any = []

const Products = ref();
const categories = ref([]);
const Authenticated = ref(false)
const cartLoading = ref(false)
let token = localStorage.getItem('LF_Token')

const getProducts = async () => {
  let response = await axios.get('https://api-lifeformula.com/api/products');
  Products.value = response.data.products as any
  console.log(Products.value);
}

const getCategories = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/categories');
    categories.value = response.data.Categories.map((obj : any) => {
        return { name: obj.name, code: obj.id };
    });
    console.log(categories.value);
}

const addToCart = (productId : number) => {
    isDialogVisible.value = true
    cartLoading.value = true
    const ProductFound = Products.value.find((product : any) => product.id == productId);
    const newProductObject : any = {
        product : ProductFound
    }
    console.log(ProductFound);
    
    if(Authenticated.value == true){
        let request = {
            product_id : productId ,
            quantity : 1
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
            newProductObject.quantity = 1
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
            parsedCart.push(newProductObject)
            parsedCart = JSON.stringify(parsedCart)
            let encryptedCart = AES.encrypt(parsedCart , 'EncryptionKey_liformula24').toString()
            localStorage.setItem('LF-Cart',encryptedCart)
        }
        else{
            cartLoading.value = false
            let cart : any = []
            newProductObject.quantity = 1
            cart.push(newProductObject);
            cart = JSON.stringify(cart)
            let encryptedCart = AES.encrypt(cart , 'EncryptionKey_liformula24').toString()
            localStorage.setItem('LF-Cart',encryptedCart)
        }
    }
}

onBeforeMount(() => {
  if(token){
    console.log(token);
    Authenticated.value = true
    let decrypted_token = AES.decrypt(token , 'EncryptionKey_liformula24').toString(enc.Utf8)        
    axios.defaults.headers.common['Authorization'] = `Bearer ${decrypted_token}`
  }
  getProducts();
  getCategories();
})


onMounted(() => {
    setTimeout(() => {
        loading.value = false
        productTmp = Products.value
    }, 1800);
    setTimeout(() => {
        Slogan.value = true
    }, 1000);
})



const home = ref({
    icon: 'pi pi-home',
    to: '/',
});
const items = ref([
    {label: 'Shop'},
    {label: 'Vitamins'},
]);

watch(SearchValue, () => {
      console.log('myValue changed');
      if(selectedCategories.value.length == 0) {
        Products.value = productTmp
      }
      // Perform actions or call functions
      const query = SearchValue.value.toLowerCase();
      if (query === '') {
        Products.value = productTmp
      } else {
        Products.value = productTmp.filter((product : any) =>
          product.name.toLowerCase().includes(query)
        );
      }
});
watch(selectedCategories, () => {
    //   console.log('myValue changed');   
      if(SearchValue.value == '' || SearchValue.value == undefined){
        Products.value = productTmp
      }
      if(selectedCategories.value.length == 0) {
        loading.value = true
        Products.value = productTmp
        setTimeout(() => {
            loading.value = false
        }, 500);
      }
      else{
        let filteredCategories = productTmp
        selectedCategories.value.forEach((element) => {
            filteredCategories = filteredCategories.filter((product : any) =>
          product.categoryName.toLowerCase().includes(element.name.toLowerCase())
        );
        console.log(element.name);
        });
        loading.value = true
        Products.value = filteredCategories
        setTimeout(() => {
            loading.value = false
        }, 500);
      }
});

</script>
<template>
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
    <div v-else>
        <span class="material-symbols-outlined text-6xl greenLogoColor text-center my-2 m-auto flex justify-content-center cursor-pointer">
            task_alt
        </span>
        <h4 class="text-center p-2 my-2">Product Added To Cart Successfully!</h4>
    </div>
    <template #footer>
        <Button class="textSmMob mt-2" label="Go To Cart" icon="pi pi-shopping-cart" @click="push('/cart'); scrollToTop()" text />
        <Button class="textSmMob mt-2" label="Continue Shopping" icon="pi pi-shopping-bag" @click="isDialogVisible = false" autofocus />
    </template>
</Dialog>    

<div style="background-color: #f2f4f76b;" class="pb-5">
    <div class="relative">
        <img src="../../assets/Model2.jpg" class="noneForMob w-full mb-4 fadeinup animation-duration-1000 animation-iteration-1" alt="">
        <img src="../../assets/mobileModel2.png" class="hidden MobBlock w-full mb-4 fadeinup animation-duration-1000 animation-iteration-1" alt="">
        <div v-if="Slogan" class="SloganResponsive noneForMob" style="position: absolute; top: 50%; right: 10%; text-align: center;">
            <span class="material-symbols-outlined lg:text-7xl md:text-2xl sm:text-lg text-white text-center m-auto fadein animation-duration-2000 animation-iteration-1">spa</span>
            <h1 class="fadein animation-duration-2000 animation-iteration-1 text-white hidden lg:flex justify-content-center">Shaping a healthier future!</h1>
            <h1 class="fadein animation-duration-2000 animation-iteration-1 text-white text-sm lg:hidden text-center">Shaping a healthier future!</h1>
            <p style="color: rgba(0, 0, 0, 0.663);" class="fadein animation-duration-3000 animation-iteration-1 hidden lg:flex justify-content-center">Empowering wellness .. One supplement at a time</p>
            <p style="color: rgba(0, 0, 0, 0.663);" class="fadein animation-duration-3000 animation-iteration-1 lg:hidden text-xs text-center">Empowering wellness .. One supplement at a time</p>
        </div>
    </div>
    <div class="flex p-2 px-5 align-items-center">
        <span class="material-symbols-outlined text-7xl mx-1">relax</span>
        <h1 class="darkGrey" style="width: fit-content;">Our Supplements</h1>
        <hr class="sm:hidden lg:flex md:flex ml-2 noneForMob" style="width: 60%; height: 0.3vh; background-color: black;">
    </div>
    <div class="sm:w-full md:w-full p-2 m-auto fadeindown animation-duration-1000 animation-iteration-1" style="width: 87% !important;">
        <div v-if="loading" class="w-full flex sm:flex-column md:flex-column lg:flex-row flex-wrap">
            <div v-for="i in 3" key="i" class="p-2 lg:w-4 sm:w-full md-w-full responsivee">
                <div class="p-4 border-1 mx-2 surface-border surface-card border-round">
                    <div class="flex flex-column align-items-center gap-3 py-2">
                        <Skeleton class="w-11 shadow-2 border-round h-12rem surface-400" />
                        <Skeleton class="w-7 border-round h-1rem surface-400" />
                        <Skeleton class="w-6rem border-round h-1rem surface-400" />
                        <Skeleton class="w-6rem border-round h-1rem surface-400" />
                    </div>
                    <div class="flex align-items-center justify-content-center py-2">
                        <Skeleton class="w-12rem border-round h-3rem surface-400" />
                    </div>
                </div>
            </div>
        </div>
        <!-- {{ selectedCategories }} -->
        <data-view v-if="!loading" ref="dataview" animation-duration-1000 animation-iteration-1 :value="Products" paginator :layout="layout" dataKey="productId" :rows="6">
            <template #header>
                <div class="flex justify-content-between headerResp align-items-center">
                    <div v-if="categories && categories.length > 0" class="flex sm:flex-column md:flex-column align-items-center lg:flex-row FilterResponsive">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="SearchValue" class="font-bold" placeholder="Search Products" />
                        </span>
                        <span class="p-float-label mx-3 font-light w-full sm:my-4 md:my-4 mb-0 lg:my-1 FilterResponsiveSelect">
                            <MultiSelect id="ms-cities" v-model="selectedCategories" filter :options="categories" optionLabel="name" :maxSelectedLabels="3" class="w-full md:w-20rem" />
                            <label for="ms-cities">Select Product Categories</label>
                        </span>
                    </div>
                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </template>
            <template #grid="slotProps">
                <div class="cardss fadein flex flex-wrap justify-content-center m-auto responsivee" >
                    <div class="p-4 CARD m-2" style="width: fit-content;">
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
                            <p class="text-sm greenLogoColor my-2">{{ slotProps.data.price }}$ <span style="color: grey; text-decoration: line-through;" class="mx-2" v-if="slotProps.data.old_price">{{slotProps.data.old_price}}$</span></p>
                            <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="addToCart(slotProps.data.id)">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                                    shopping_cart
                                </span> </h4>
                            </div>
                        </div>
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="flex flex-column my-3 w-full">
                        <div class="flex sm:flex-column md:flex-column lg:flex-row FilterResponsive w-full p-2">
                            <div class="ProductImgList mr-5" @click="push(`/products/${slotProps.data.id}`); scrollToTop()">
                                <img :src="slotProps.data.image" class="productList" alt="">
                                <span class="material-symbols-outlined appearOnHover">
                                    visibility
                                </span>
                                <h4 v-if="slotProps.data.sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">-{{ slotProps.data.sale }}%</h4>
                            </div>
                            <div class="flex justify-content-between w-full">
                                <div class="flex flex-column">
                                    <p style="color: grey;" class="text-sm my-2">{{slotProps.data.categoryName}}</p>
                                    <h3 class=" my-2">{{slotProps.data.name}}</h3>    
                                    <p class="lg:w-10 text-justify sm:w-full md:w-full responsivee none" v-if="slotProps.data.product_description.length > 300">{{slotProps.data.product_description.substring(0, 250)}} ... <RouterLink :to="`/products/${slotProps.data.id}`" @click="scrollToTop()">See More</RouterLink></p>
                                    <p class="lg:w-10 text-justify sm:w-full md:w-full responsivee none" v-else>{{slotProps.data.product_description}}</p>
                                </div>
                                <div class="flex flex-column align-items-center justifyStart sm:justify-content-start md:justify-content-start lg:justify-content-center">
                                    <p class="text-md greenLogoColor my-2">{{ slotProps.data.price }}$</p>
                                    <span style="color: grey; text-decoration: line-through;" class="mx-2" v-if="slotProps.data.old_price">{{slotProps.data.old_price}}$</span>
                                    <span @click="addToCart(slotProps.data.id)" class="none material-symbols-outlined text-4xl CartHover text-white p-2 my-2 cursor-pointer"
                                     style="background-color: #00a650; border-radius: 50%;">
                                        shopping_cart
                                    </span>
                                </div>
                            </div>
                            <p class="lg:hidden text-justify sm:w-full md:w-full responsivee" v-if="slotProps.data.product_description.length > 250">{{slotProps.data.product_description.substring(0, 250)}} ... <RouterLink :to="`/products/${slotProps.data.id}`" @click="scrollToTop()">See More</RouterLink></p>
                            <p class="lg:hidden text-justify sm:w-full md:w-full responsivee" v-else>{{slotProps.data.product_description}}</p>

                        </div>
                    </div>
                </template>
        </data-view>
    </div>
</div>
</template>
<style>

@keyframes ldio-ujurhm9bi0c {
    0% { transform: rotate(0) }
    100% { transform: rotate(360deg) }
}
  .ldio-ujurhm9bi0c div { box-sizing: border-box!important }
  .ldio-ujurhm9bi0c > div {
    position: absolute;
    width: 130.2px;
    height: 130.2px;
    top: 43.4px;
    left: 43.4px;
    border-radius: 50%;
    border: 13.02px solid #000;
    border-color: #00a650 transparent #00a650 transparent;
    animation: ldio-ujurhm9bi0c 2.272727272727273s linear infinite;
  }
  
  .ldio-ujurhm9bi0c > div:nth-child(2), .ldio-ujurhm9bi0c > div:nth-child(4) {
    width: 99.82px;
    height: 99.82px;
    top: 58.589999999999996px;
    left: 58.589999999999996px;
    animation: ldio-ujurhm9bi0c 2.272727272727273s linear infinite reverse;
  }
  .ldio-ujurhm9bi0c > div:nth-child(2) {
    border-color: transparent #00405a transparent #00405a
  }
  .ldio-ujurhm9bi0c > div:nth-child(3) { border-color: transparent }
  .ldio-ujurhm9bi0c > div:nth-child(3) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }
  .ldio-ujurhm9bi0c > div:nth-child(3) div:before, .ldio-ujurhm9bi0c > div:nth-child(3) div:after { 
    content: "";
    display: block;
    position: absolute;
    width: 13.02px;
    height: 13.02px;
    top: -13.02px;
    left: 45.57px;
    background: #00a650;
    border-radius: 50%;
    box-shadow: 0 117.17999999999999px 0 0 #00a650;
  }
  .ldio-ujurhm9bi0c > div:nth-child(3) div:after {
    left: -13.02px;
    top: 45.57px;
    box-shadow: 117.17999999999999px 0 0 0 #00a650;
  }
  
  .ldio-ujurhm9bi0c > div:nth-child(4) { border-color: transparent; }
  .ldio-ujurhm9bi0c > div:nth-child(4) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }
  .ldio-ujurhm9bi0c > div:nth-child(4) div:before, .ldio-ujurhm9bi0c > div:nth-child(4) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 13.02px;
    height: 13.02px;
    top: -13.02px;
    left: 30.38px;
    background: #00405a;
    border-radius: 50%;
    box-shadow: 0 86.8px 0 0 #00405a;
  }
  .ldio-ujurhm9bi0c > div:nth-child(4) div:after {
    left: -13.02px;
    top: 30.38px;
    box-shadow: 86.8px 0 0 0 #00405a;
  }
  .loadingio-spinner-double-ring-cm1ltjai5mu {
    width: 217px;
    height: 217px;
    display: inline-block;
    overflow: hidden;
  }
  .ldio-ujurhm9bi0c {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-ujurhm9bi0c div { box-sizing: content-box; }

.p-dataview .p-dataview-content {
    background-color: rgba(255, 255, 255, 0.05);
}
.ProductImgList{
  position: relative;
  cursor: pointer;
  margin-bottom: 2vh;
  background-color: black;
  width: 295px;
  height: 260px;
  border-start-start-radius: 16px !important;
  border-start-end-radius: 16px !important;
}
.productList{
  width: 295px;
  height: 260px;
  opacity: 1;
  transition-duration: 0.3s;
  border-start-start-radius: 16px !important;
  border-start-end-radius: 16px !important;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.368);
}
.ProductImgList:hover .productList{
    opacity: 0.5;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.829);
}
.ProductImgList:hover .appearOnHover{
    opacity: 1;
  }
.CartHover{
    transition-duration: 0.2s;
}
.CartHover:hover{
    padding: 1.7vh !important;
    background-color: #016a33;
}
@media screen and (max-width : 750px){
.SloganResponsive{
    top: 50% !important;
    right: 3vh !important;
} 
}
@media screen and (max-width : 570px){
.responsivee{
    width: 100% !important;
}    
.SloganResponsive{
    top: 30% !important;
    right: 3vh !important;
} 
.SloganResponsive span{
    font-size: 30px;
}
.SloganResponsive p{
    display: none;
}
.none{
    display: none !important;
}
.FilterResponsive{
    flex-direction: column !important;
}
.FilterResponsiveSelect{
    margin-bottom: 1.5vh !important;
    margin-top: 3vh !important;
}
.justifyStart{
    justify-content: start !important;
}
}
@media screen and (max-width : 480px){
    .headerResp{
        flex-direction: column !important;
        width: 100% !important;
        justify-content: center !important;
        margin: auto;
        align-items: center;
    }
    .textSmMob{
        font-size: 13px !important;
    }
    .headerResp input{
        margin: 1vh 0;
    }
}

</style>