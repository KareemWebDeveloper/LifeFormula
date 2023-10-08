<script setup lang="ts">
import DashBoardSideBar from '@/components/DashBoardSideBar.vue'
import DataView from 'primevue/dataview';
import { FormKit } from '@formkit/vue';
import Editor from 'primevue/editor';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import ScrollPanel from 'primevue/scrollpanel';
import axios from "axios";
import { ref, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { AES, enc } from 'crypto-js';
import type { Ref } from 'vue';

const isErrorVisible = ref(false)
const ErrorMsg = ref()
const categories = ref()
let productTmp : any = []
const products = ref()
const isDialogVisible = ref(false)
const selectedCategories : Ref<Array<any>> = ref([])
const SearchValue = ref()
const productFindLoading = ref(false)
const updateProduct = ref()
const updateLoading = ref(false)
const ProductUpdatedSuccessfully = ref(false)

const openProductDialog = (product : any) => {
    productFindLoading.value = true
    isDialogVisible.value = true
    console.log(product);
    updateProduct.value = product
    if(updateProduct.value.featured == 1 ){
        updateProduct.value.featured = true
    }
    else{
        updateProduct.value.featured = false
    }
    setTimeout(() => {
        productFindLoading.value = false
    }, 300);
}

watch(SearchValue, () => {
      console.log('myValue changed');
      if(selectedCategories.value.length == 0) {
        products.value = productTmp
      }
      // Perform actions or call functions
      const query = SearchValue.value.toLowerCase();
      if (query === '') {
        products.value = productTmp
      } else {
        products.value = productTmp.filter((product : any) =>
          product.name.toLowerCase().includes(query)
        );
      }
});
watch(selectedCategories, () => {
    //   console.log('myValue changed');   
      if(SearchValue.value == '' || SearchValue.value == undefined){
        products.value = productTmp
      }
      if(selectedCategories.value.length == 0) {
        products.value = productTmp
      }
      else{
        let filteredCategories = productTmp
        selectedCategories.value.forEach((element : any) => {
            filteredCategories = filteredCategories.filter((product : any) =>
          product.categoryName.toLowerCase().includes(element.name.toLowerCase())
        );
        console.log(element.name);
        });
        products.value = filteredCategories
      }
});
const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
    if(response.data.userRole == 'user'){
        push('/')
    }
}

const { push } = useRouter();

const getCategories = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/categories');
    categories.value = response.data.Categories.map((obj : any) => {
        return { name: obj.name, code: obj.id };
    });
    console.log(categories.value);
}
const getProducts = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/products');
    products.value = response.data.products
    productTmp = products.value
}

const calcOldPrice = () => {
    if(updateProduct.value.price && updateProduct.value.sale){
        let saleAmount = updateProduct.value.price * (updateProduct.value.sale / 100)
        updateProduct.value.old_price = (parseFloat(updateProduct.value.price) + saleAmount).toFixed(2)
    }
}

let token = localStorage.getItem('LF_Token')
onBeforeMount(() => {
    if(!token){
        push('/')
    }
    else{
        let decrypted_token = AES.decrypt(token , 'EncryptionKey_liformula24').toString(enc.Utf8)        
        axios.defaults.headers.common['Authorization'] = `Bearer ${decrypted_token}`
        checkUserRole()
        getCategories()
        getProducts()
    }
})

const updateActiveProduct = () => {
    const filteredEntries = Object.entries(updateProduct.value).filter(([key, value]) => value !== null);
    updateProduct.value = Object.fromEntries(filteredEntries)
    updateLoading.value = true
    parseFloat(updateProduct.value.price)
    if(updateProduct.value.old_price){
        parseFloat(updateProduct.value.old_price)
    }
    console.log(updateProduct.value);
    axios.put(`https://api-lifeformula.com/api/products/update/${updateProduct.value.id}`,updateProduct.value).then((response) => {
        console.log(response);
        updateLoading.value = false
        ProductUpdatedSuccessfully.value = true
        setTimeout(() => {
            ProductUpdatedSuccessfully.value = false
            isDialogVisible.value = false
            setTimeout(() => {
                location.reload()
            }, 300);
        }, 2500);
    }).catch((error) => {
        console.log(error);
        ErrorMsg.value = error.response.data.message
        isErrorVisible.value = true  
        isDialogVisible.value = false
    })
    
}
</script>
<template>
    <DashBoardSideBar></DashBoardSideBar>
<Dialog v-model:visible="isDialogVisible" modal header="Edit Product" :style="{ width: '60vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
    <div v-if="productFindLoading" class="flex w-full justify-content-center">
        <div  class="m-auto text-center loadingio-spinner-double-ring-cm1ltjai5mu"><div class="ldio-ujurhm9bi0c">
            <div></div>
            <div></div>
            <div><div></div></div>
            <div><div></div></div>
        </div>
        </div>
    </div>
    <div v-else-if="ProductUpdatedSuccessfully">
        <span class="material-symbols-outlined text-6xl greenLogoColor text-center my-2 m-auto flex justify-content-center cursor-pointer">
            task_alt
        </span>
        <h4 class="text-center p-2 my-2">Product Updated Successfully!</h4>
    </div>
    <div v-else class="editProducts p-2 surface-300 m-auto">
        <div class="p-4 flex align-items-center m-2 justify-content-center m-auto" style="width: fit-content;">
            <div class="ProductImage hidden md:flex mx-1">
                <img :src="updateProduct.image" class="productt" alt="">
                <span class="material-symbols-outlined appearOnHover">
                    edit
                </span>
                <h4 v-if="updateProduct.sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">-{{ updateProduct.sale }}%</h4>
            </div>
            <div class="px-2">
                <p style="color: grey;" class="text-sm my-2">{{updateProduct.categoryName}}</p>
                <h3 class=" my-2">{{updateProduct.name}}</h3>
                <p class="text-sm greenLogoColor my-2">${{ updateProduct.price }} <span style="color: grey; text-decoration: line-through;" class="mx-2" v-if="updateProduct.old_price">${{updateProduct.old_price}}</span></p>
                <ScrollPanel style="width: 100%; height: 150px">
                    <p v-html="updateProduct.product_description" class="text-sm w-11 fontt text-justify"></p>
                </ScrollPanel>
            </div>
        </div>
        <FormKit type="form" :actions="false" v-model="updateProduct" @submit="updateActiveProduct">
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">alternate_email</span> -->
                    <label for="namee" class="px-1 fontt">Product Name</label>
                </div>
                <FormKit id="namee" type="text" label="ProductName" placeholder="Enter your product name" name="name" validation="required" />
            </div>

            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="count" class="px-1 fontt">Product Count</label>
                </div>
                <FormKit type="number" number="integer" id="count" label="Product Count" placeholder="Enter your product count" name="count" validation="required|min:0" />
            </div>

            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="price" class="px-1 fontt">Product Price</label>
                </div>
                <FormKit type="text" id="price" label="Product price" placeholder="Enter your product price" name="price" validation="required|number|min:1" />
            </div>

            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="Image" class="px-1 fontt">Product Image Link</label>
                </div>
                <a class="text-sm text-center m-auto flex justify-content-center my-2" target="_blank" href="https://github.com/KareemWebDeveloper/LifeFormulaImages/blob/main/Images">copy image url from here</a>
                <FormKit type="text" id="Image" label="Product image" placeholder="Enter your product image" name="image" validation="required" />
            </div>

            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="Category" class="px-1 fontt">Product Category</label>
                </div>
                <!-- <FormKit type="number" id="Category" label="Product Category" placeholder="Enter your product count" name="category_id" validation="required" /> -->
                <FormKit type="select" label="Product Category" id="Category" name="category_id" placeholder="Choose your product category" :options="categories" />
            </div>

            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="sale" class="px-1 fontt">Product Sale <span class="text-sm">( Optional )</span></label>
                </div>
                <FormKit type="number" id="sale" label="Product Sale" placeholder="Enter your product sale" name="sale" validation="min:0" />
            </div>

            <div class="flex justify-content-center m-auto">
                <Button type="button" class="submitBtn w-5" label="Calculate Old Price" @click="calcOldPrice" />
            </div>

            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="count" class="px-1 fontt">Product Old Price <span class="text-sm">( Optional )</span></label>
                </div>
                <FormKit type="text" id="count" label="Old Price" placeholder="Enter your old price" name="old_price" validation="number|min:0" />
            </div>
            
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="sale3" class="px-1 fontt">Sale on 3 items</label>
                </div>
                <FormKit type="number" id="sale3" label="Product Sale" placeholder="Enter your product sale on 3 items" name="sale_on_3" validation="min:1" />
            </div>
            
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="sale6" class="px-1 fontt">Sale on 6 items</label>
                </div>
                <FormKit type="number" id="sale6" label="Product Sale" placeholder="Enter your product sale on 6 items" name="sale_on_6" validation="min:1" />
            </div>
            
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="sale9" class="px-1 fontt">Sale on 9 items</label>
                </div>
                <FormKit type="number" id="sale9" label="Product Sale" placeholder="Enter your product sale on 9 items" name="sale_on_9" validation="min:1" />
            </div>


            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="howTo" class="px-1 fontt">How To Take It</label>
                </div>
                <FormKit type="textarea" rows="5" id="howTo" label="Product Count" placeholder="describe how to take it" name="how_to_take_it" validation="required" />
            </div>
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="description" class="px-1 fontt">Product Description</label>
                </div>
                <div class="card">
                    <Editor id="articlee" v-model="updateProduct.product_description" editorStyle="height: 320px" />
                </div>
            </div>

            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="iconss" class="px-1 fontt">Product Icons</label>
                </div>
                <FormKit type="textarea" rows="5" id="iconss" placeholder="enter your product icons" label="Product Icons" name="product_icons" validation="required" />
            </div>
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="articlee" class="px-1 fontt">Product Article</label>
                </div>
                <div class="card">
                    <Editor id="articlee" v-model="updateProduct.product_article" editorStyle="height: 320px" />
                </div>
            </div>

            <div class="mt-3 p-3" style="background-color: rgba(255, 255, 255, 0.614); border-radius: 15px;">
                <h6 class="text-center mb-3">Fill only one of the following</h6>
                <div class="flex align-items-center justify-content-center">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="ingImg" class="px-1 fontt">Ingredients Image</label>
                </div>
                <a class="text-sm text-center m-auto flex justify-content-center my-2" target="_blank" href="https://github.com/KareemWebDeveloper/LifeFormulaImages/blob/main/Images">copy image url from here</a>

                <FormKit type="text" id="ingImg" label="Product Count" placeholder="Enter your product ingredients image" name="ingredients_image" validation="" />
            <!-- </div>

            <div class="mt-3"> -->
                <div class="flex align-items-center justify-content-center mt-2">
                    <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                    <label for="ingText" class="px-1 fontt">Ingredients Description</label>
                </div>
                <FormKit type="textarea" rows="5" id="ingText" label="Product Count" placeholder="Enter your product ingredients description" name="ingredients_text" validation="" />
            </div>

            <div class="my-3 flex align-items-center justify-content-center">
                <p class="my-3 mx-2">Featured </p>
                <InputSwitch v-model="updateProduct.featured" />
            </div>

            <Button type="submit" class="submitBtn" label="Update Product" :loading="updateLoading" />
        </FormKit>
        <p class="formkit-message text-center my-2 mt-4 w-8 m-auto" v-if="isErrorVisible">{{ ErrorMsg }}</p>

    </div>
    <!-- <template #footer>
        <Button class="textSmMob mt-2" label="Go To Cart" icon="pi pi-shopping-cart" @click="push('/cart'); scrollToTop()" text />
        <Button class="textSmMob mt-2" label="Continue Shopping" icon="pi pi-shopping-bag" @click="isDialogVisible = false" autofocus />
    </template> -->
</Dialog>   

    <div v-if="products" class="surface-100 p-5 mx-5" style="margin-top: 15vh !important;">
        <data-view ref="dataview" animation-duration-1000 animation-iteration-1 :value="products" paginator layout="grid" dataKey="productId" :rows="6">
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
                    <Button type="button" label="Create" class="px-4" @click="push('/dashboard/products/add')" severity="success" icon="pi pi-plus" />
                </div>
            </template>
            <template #grid="slotProps">
                <div class="cardss fadein flex flex-wrap justify-content-center m-auto responsivee" >
                    <div class="p-4 CARD m-2" style="width: fit-content;" @click="openProductDialog(slotProps.data)">
                        <div class="ProductImage">
                            <img :src="slotProps.data.image" class="productt" alt="">
                            <span class="material-symbols-outlined appearOnHover">
                                edit
                            </span>
                            <h4 v-if="slotProps.data.sale" style="background-color: #ffc12b; color: white; position: absolute; top: 20px; right: 25px; border-radius: 6px;" class="p-1 px-3">-{{ slotProps.data.sale }}%</h4>
                        </div>
                        <div class="px-2">
                            <p style="color: grey;" class="text-sm my-2">{{slotProps.data.categoryName}}</p>
                            <h3 class=" my-2">{{slotProps.data.name.split(' ').slice(0, 3).join(' ')}}</h3>
                            <p class="text-sm greenLogoColor my-2">{{ slotProps.data.price }}$ <span style="color: grey; text-decoration: line-through;" class="mx-2" v-if="slotProps.data.old_price">${{slotProps.data.old_price}}</span></p>
                            <h4 class="p-3 px-4 flex align-items-center AddToCart text-center justify-content-center">EDIT PRODUCT <span class="material-symbols-outlined text-2xl mx-1 cursor-pointer">
                                    edit
                                </span> </h4>
                            </div>
                        </div>
                    </div>
                </template>
        </data-view>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.fontt{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
.greenHoverBg{
    transition-duration: 0.2s;
}
.greenHoverBg:hover{
background-color: #00a650 !important;
color: white !important;
}
.greenHoverBg:hover h3{
color: white !important;
}
.greenHoverBg:hover .icon{
    color: white !important;
}
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
.editProducts .formkit-input{
    text-align: center;
    padding: 1.8vh;
    margin: auto;
    border: none;
    border-radius: 3px;
    width: 100%;
    font-size: 13px;
    background-color: rgba(255, 255, 255, 0.868);
    border-bottom: 2px solid rgba(0, 0, 0, 0.696);
}
.editProducts .formkit-input::placeholder{
    color: rgba(0, 0, 0, 0.79);
}
.editProducts .formkit-input:focus{
    outline: none;
    border: 2px solid #009a33;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.442);

}
.editProducts .formkit-form{
    margin: 2vh auto;
    width: 75%;
}
.editProducts .formkit-wrapper{
    padding:  1vh;
}
.editProducts .formkit-messages{
    list-style: none;
    padding: 0;
}
.editProducts .formkit-message{
    color: white;
    background-color: rgba(255, 0, 0, 0.684);
    padding: 1.5vh;
    margin: 1vh 2vh;
    border-radius: 3px;
}
.editProducts .submitBtn{
    background-color: white;
    color: black;
    margin: 2vh auto;
    padding: 1.5vh;
    width: 100%;
    border: none;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.342);
    border-radius: 8px;
    transition-duration: 0.2s;
}
.editProducts .submitBtn:hover{
    background-color: #009a33 !important;
    color: white !important;
}
.editProducts label{
    padding: 0 1.8vh;
    text-align: center !important;
}
.editProducts .formkit-label{
    display: none;
    padding: 1vh;
}
.login .p-selectbutton .p-button.p-highlight{
    background-color: #00a650;
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