<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import Button from 'primevue/button';
import Editor from 'primevue/editor';
import InputSwitch from 'primevue/inputswitch';
import axios from "axios";
import { ref , onBeforeMount} from 'vue'
import { useRouter } from 'vue-router';
import { AES, enc } from 'crypto-js';
import DashBoardSideBar from '@/components/DashBoardSideBar.vue'

const { push } = useRouter();
let OptionsValue = ref('Create');
const options = ref(['Create','Update']);
const product_article = ref()
const Featured = ref(false)
const loading = ref(false)
const ProductSaved = ref(false)
const isErrorVisible = ref(false)
const ErrorMsg = ref()
const categories = ref([])

const templateIconsJson = `{
  "product_icons": [
    {
      "icon_name": "icon1",
      "icon_title": "Icon 1"
    },
    {
      "icon_name": "icon2",
      "icon_title": "Icon 2"
    },
    {
      "icon_name": "icon3",
      "icon_title": "Icon 3"
    }
  ]
}`

const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
    if(response.data.userRole == 'user'){
        push('/')
    }
}

const getCategories = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/categories');
    categories.value = response.data.Categories.map((obj : any) => {
        return { label: obj.name, value: obj.id };
    });
    console.log(categories.value);
}
const productIconsTemplate = ref(templateIconsJson)
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
    }
})
const createProduct = (req : any) => {
    loading.value = true
    req.featured = Featured.value;
    req.product_article = product_article.value
    req.price = parseFloat(req.price)
    if(req.old_price){
        req.old_price = parseFloat(req.old_price)
    }
    console.log(req);
    axios.post("https://api-lifeformula.com/api/products/create",req).then((response) => {
        console.log(response);
        loading.value = false
        ProductSaved.value = true
        window.scrollTo(0,50)
        setTimeout(() => {
            location.reload();
        }, 5000);
    }).catch((error) => {
        isErrorVisible.value = true
        console.log(error.response);
        ErrorMsg.value = error.response.data.message
        loading.value = false
    });
}

</script>
<template>
    <DashBoardSideBar></DashBoardSideBar>

    <div class="bgImg h-full p-5 padding1 paddingTop login">
        <div class="slidedown animation-iteration-1 animation-duration-1000 lg:p-5 md:p-4 sm:p-3 padding1 lg:w-7 md:w-9 sm:w-10 widthFull my-5 m-auto flex flex-column justify-content-center" style="background-color: rgba(114, 114, 114, 0.291); border-radius: 5px;">
            <h1 class="text-center fontt font21 padding1 lg:pt-5">Welcome To Life Formula DashBoard</h1>
            <!-- Error Message -->

            <p class="formkit-message text-center my-2 mt-4 w-8 m-auto" v-if="isErrorVisible">{{ ErrorMsg }}</p>

            <p v-if="ProductSaved" class="p-3 text-white px-3 w-6 text-center m-auto" style="border-radius: 10px; background-color: rgb(2, 156, 2);">Product Saved Successfully!</p>
            <!-- Create and Update Products -->
            <div v-if="categories.length > 0">
                <FormKit type="form" :actions="false" @submit="createProduct">
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
                        <FormKit type="number" number="integer" id="count" label="Product Count" placeholder="Enter your product count" name="count" validation="required|min:1" />
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
                        <FormKit type="number" id="sale" label="Product Sale" placeholder="Enter your product sale" name="sale" validation="min:1" />
                    </div>

                    <div class="mt-3">
                        <div class="flex align-items-center justify-content-center">
                            <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                            <label for="count" class="px-1 fontt">Product Old Price <span class="text-sm">( Optional )</span></label>
                        </div>
                        <FormKit type="text" id="count" label="Old Price" placeholder="Enter your old price" name="old_price" validation="number|min:1" />
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
                        <FormKit type="textarea" rows="3" id="howTo" label="Product Count" placeholder="describe how to take it" name="how_to_take_it" validation="required" />
                    </div>
                    <div class="mt-3">
                        <div class="flex align-items-center justify-content-center">
                            <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                            <label for="description" class="px-1 fontt">Product Description</label>
                        </div>
                        <FormKit type="textarea" rows="3" id="description" label="Product description" placeholder="describe your product" name="product_description" validation="required" />
                    </div>

                    <div class="mt-3">
                        <div class="flex align-items-center justify-content-center">
                            <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                            <label for="iconss" class="px-1 fontt">Product Icons</label>
                        </div>
                        <p class="text-sm text-center">edit this product icons template and add your icons</p>
                        {{ templateIconsJson }}
                        <FormKit type="textarea" rows="3" id="iconss" placeholder="enter your product icons" label="Product Icons" name="product_icons" validation="required" />
                    </div>
                    <div class="mt-3">
                        <div class="flex align-items-center justify-content-center">
                            <!-- <span class="material-symbols-outlined text-3xl">vpn_key</span> -->
                            <label for="articlee" class="px-1 fontt">Product Article</label>
                        </div>
                        <div class="card">
                            <Editor id="articlee" v-model="product_article" editorStyle="height: 320px" />
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
                        <FormKit type="textarea" rows="3" id="ingText" label="Product Count" placeholder="Enter your product ingredients description" name="ingredients_text" validation="" />
                    </div>

                    <div class="my-3 flex align-items-center justify-content-center">
                        <p class="my-3 mx-2">Featured </p>
                        <InputSwitch v-model="Featured" />
                    </div>

                    <Button type="submit" class="submitBtn" label="Create Product" :loading="loading" />
                </FormKit>
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.bgImg{
    background: #1a1b20 url('../../assets/bggGredient2.jpg') fixed;
    background-size: cover;
}
.p-inputswitch .p-inputswitch-slider{
    background: #27394bd4 ;
}
.formkit-input{
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
.formkit-input::placeholder{
    color: rgba(0, 0, 0, 0.79);
}
.formkit-input:focus{
    outline: none;
    border: 2px solid #009a33;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.442);

}
.formkit-form{
    margin: 2vh auto;
    width: 75%;
}
.formkit-wrapper{
    padding:  1vh;
}
.formkit-messages{
    list-style: none;
    padding: 0;
}
.formkit-message{
    color: white;
    background-color: rgba(255, 0, 0, 0.684);
    padding: 1.5vh;
    margin: 1vh 2vh;
    border-radius: 3px;
}
.submitBtn{
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
.submitBtn:hover{
    background-color: #009a33 !important;
    color: white !important;
}
label{
    padding: 0 1.8vh;
    text-align: center !important;
}
.formkit-label{
    display: none;
    padding: 1vh;
}
.login .p-selectbutton .p-button.p-highlight{
    background-color: #00a650;
}
.fontt{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
@media screen and (max-width : 750px){
    .formkit-form{
        width: 90%;
    }    
}
@media screen and (max-width : 570px){
    .formkit-form{
        width: 95% !important;

    }
    .marginBtm{
        margin-bottom: 5vh !important;
    }
    .widthFull{
        width: 100% !important;
    }
    .formkit-message{
        font-size: 13px;
    }
    .padding1{
        padding: 1.5vh !important;
    }    
    .paddingTop{
        padding-top: 3.8vh !important;
        padding-bottom: 10vh !important;
    }
    .font21{
        font-size: 21px;
    }
}
</style>