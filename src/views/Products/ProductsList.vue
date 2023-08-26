<script setup>
import DataView from 'primevue/dataview';
import { ref , onMounted , watch } from 'vue';
import Skeleton from 'primevue/skeleton';
import Breadcrumb from 'primevue/breadcrumb';
import InputText from 'primevue/inputtext';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'   // optional
import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import ContactIcons from '@/components/ContactIcons.vue';
const { push } = useRouter();
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
const isDialogVisible = ref(false)
const selectedCategories = ref([])
const loading = ref(true)
const Slogan = ref(false)
const layout = ref('grid')
const SearchValue = ref()
let productTmp = []

const categories = ref([
    { name: 'Wellness Supplements' },
    { name: 'Fertility Supplements' },
])

let Products = ref([
{
    productId : 3 ,
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/Mockup%20with%20Golden%20Flip%20Top.jpg",
    productName : "Raspberry ketone",
    productDescription : "Raspberry ketones are a natural compound found in raspberries. They have been shown to have a number of health benefits",
    CategoryName : "Wellness Supplements",
    Price : '7.20$',
    OldPrice : '13.00$', 
    Sale : "-35%",
    Rating : 0
},
{
    productId : 2 ,
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/GreenCoffee.jpg",
    productName : "Green coffee",
    productDescription : "Green coffee bean extract is also a good source of other antioxidants, such as quercetin and kaempferol. These antioxidants can help protect your cells from damage and improve your overall health",
    CategoryName : "Wellness Supplements",
    Price : '13.90$',
    OldPrice : '18.00$', 
    Sale : "-20%",
    Rating : 0
},
  {
    productId : 4,
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/D3-10000%20LQ.jpg",
    productName : "D3 10,000 IU",
    productDescription : "Vitamin D3 is a nutrient that is essential for many bodily functions, including bone health, immune function, and muscle function. It is also important for the absorption of calcium and phosphorus.",
    CategoryName : "Wellness Supplements",
    Price : '8.60$',
    // OldPrice : '10.00$', 
    // Sale : "-10%",
    Rating : 0
  },
  {
    productId : 5,
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/WFS-PLUS.jpg",
    productName : "WFS PLUS",
    productDescription : "Life Formula's WFS MAX is a natural supplement that can help women with fertility problems. It contains ingredients that improve insulin sensitivity and ovulation, two important factors for conception",
    CategoryName : "Fertility Supplements",
    Price : '74.99$',
    // OldPrice : '38.99$', 
    // Sale : "-12%",
    Rating : 0
  },
  {
    productId : 1 ,
    productImage : "https://github.com/KareemWebDeveloper/LifeFormulaImages/blob/main/Images/D3-50000.jpg?raw=true",
    productName : "D3 50,000 IU",
    productDescription : "Vitamin D3 is a nutrient that is essential for many bodily functions, including bone health, immune function, and muscle function. It is also important for the absorption of calcium and phosphorus",
    CategoryName : "Wellness Supplements",
    Price : '28.50$',
    // OldPrice : '32.00$', 
    // Sale : "-13%",
    Rating : 0
},
  {
    productId : 6,
    productImage : "https://raw.githubusercontent.com/KareemWebDeveloper/LifeFormulaImages/main/Images/MFS.jpg",
    productName : "MFS",
    productDescription : "Life Formula's MFS is a natural supplement that can help men with fertility problems. It contains ingredients that support sperm count, motility, and morphology.",
    CategoryName : "Fertility Supplements",
    Price : '74.99$',
    // OldPrice : '39.99$', 
    // Sale : "-17%",
    Rating : 0
  },
])

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 2700);
    setTimeout(() => {
        Slogan.value = true
    }, 1000);
    productTmp = Products.value
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
      if(selectedCategories.length == 0) {
        Products.value = productTmp
      }
      // Perform actions or call functions
      const query = SearchValue.value.toLowerCase();
      if (query === '') {
        Products.value = productTmp
      } else {
        Products.value = productTmp.filter(product =>
          product.productName.toLowerCase().includes(query)
        );
      }
});
watch(selectedCategories, () => {
      console.log('myValue changed');   
      if(SearchValue.value == '' || SearchValue.value == undefined){
        Products.value = productTmp
      }
      if(selectedCategories.length == 0) {
        Products.value = productTmp
      }
      else{
        let filteredCategories = productTmp
        selectedCategories.value.forEach((element) => {
            filteredCategories = filteredCategories.filter(product =>
          product.CategoryName.toLowerCase().includes(element.name.toLowerCase())
        );
        console.log(element.name);
        
        });
        Products.value = filteredCategories
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
                        <Skeleton class="w-11 shadow-2 border-round h-12rem" />
                        <Skeleton class="w-7 border-round h-1rem" />
                        <Skeleton class="w-6rem border-round h-1rem" />
                        <Skeleton class="w-6rem border-round h-1rem" />
                    </div>
                    <div class="flex align-items-center justify-content-center py-2">
                        <Skeleton class="w-12rem border-round h-3rem" />
                    </div>
                </div>
            </div>
        </div>
        <!-- {{ selectedCategories }} -->
        <data-view v-if="!loading" ref="dataview" animation-duration-1000 animation-iteration-1 :value="Products" paginator :layout="layout" dataKey="productId" :rows="6">
            <template #header>
                <div class="flex justify-content-between headerResp align-items-center">
                    <div class="flex sm:flex-column md:flex-column align-items-center lg:flex-row FilterResponsive">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="SearchValue" class="font-bold" placeholder="Search Products" />
                        </span>
                        <span class="p-float-label mx-3 font-light w-full sm:my-4 md:my-4 mb-0 lg:my-1 FilterResponsiveSelect">
                            <MultiSelect id="ms-cities" v-model="selectedCategories" :options="categories" optionLabel="name" :maxSelectedLabels="3" class="w-full md:w-20rem" />
                            <label for="ms-cities">Select Product Categories</label>
                        </span>
                    </div>
                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </template>
            <template #grid="slotProps">
                <div class="cardss fadein flex flex-wrap justify-content-center m-auto responsivee" >
                    <div class="p-4 CARD m-2" style="width: fit-content;">
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
                            <p class="text-sm greenLogoColor my-2">{{ slotProps.data.Price }} <span style="color: grey; text-decoration: line-through;" class="mx-2" v-if="slotProps.data.OldPrice">{{slotProps.data.OldPrice}}</span></p>
                            <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center" @click="isDialogVisible = true">ADD TO CART <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                                    shopping_cart
                                </span> </h4>
                            </div>
                        </div>
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="flex flex-column my-3 w-full">
                        <div class="flex sm:flex-column md:flex-column lg:flex-row FilterResponsive w-full p-2">
                            <div class="ProductImgList mr-5" @click="push(`/products/${slotProps.data.productId}`); scrollToTop()">
                                <img :src="slotProps.data.productImage" class="productList" alt="">
                                <span class="material-symbols-outlined appearOnHover">
                                    visibility
                                </span>
                                <h4 v-if="slotProps.data.Sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">{{ slotProps.data.Sale }}</h4>
                            </div>
                            <div class="flex justify-content-between w-full">
                                <div class="flex flex-column">
                                    <p style="color: grey;" class="text-sm my-2">{{slotProps.data.CategoryName}}</p>
                                    <h3 class=" my-2">{{slotProps.data.productName}}</h3>    
                                    <p class="lg:w-10 sm:w-full md:w-full responsivee">{{slotProps.data.productDescription}}</p>
                                </div>
                                <div class="flex flex-column align-items-center justifyStart sm:justify-content-start md:justify-content-start lg:justify-content-center">
                                    <p class="text-md greenLogoColor my-2">{{ slotProps.data.Price }}</p>
                                    <span style="color: grey; text-decoration: line-through;" class="mx-2" v-if="slotProps.data.OldPrice">{{slotProps.data.OldPrice}}</span>
                                    <span @click="isDialogVisible = true" class="material-symbols-outlined text-4xl CartHover text-white p-2 my-2 cursor-pointer"
                                     style="background-color: #00a650; border-radius: 50%;">
                                        shopping_cart
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
        </data-view>
    </div>
</div>
</template>
<style>
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
.FilterResponsive{
    flex-direction: column !important;
}
.FilterResponsiveSelect{
    margin-bottom: 1.5vh !important;
}
.justifyStart{
    justify-content: start !important;
}
}
@media screen and (max-width : 450px){
    .headerResp{
        flex-direction: column !important;
        width: 100% !important;
        justify-content: center !important;
        margin: auto;
        align-items: center;
    }
    .headerResp input{
        margin: 1vh 0;
    }
}

</style>