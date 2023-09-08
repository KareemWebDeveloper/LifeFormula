<script setup lang="ts">
import { onBeforeMount, ref, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import axios from 'axios';
import Button from 'primevue/button';
import { AES, enc } from 'crypto-js';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';   
import Checkbox from 'primevue/checkbox';   

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
const { push } = useRouter();
const Authenticated = ref(false)
const LoadingPayButton = ref(false)
const checkOutDialog = ref(false)
const ShippingTermsConditions = ref(false)
const ShippingStandard = ref(false)
let token = localStorage.getItem('LF_Token')
const CartItems : any = ref([])
const hasShippingInfo  = ref(false)
const loadingShippingInfo  = ref(false)
const userShippingInfo = ref()
const userInfo = ref()
const paymentDialog = ref(false)

const checkOut = async() => {
    if(Authenticated.value == true){
        checkOutDialog.value = true
        loadingShippingInfo.value = true
        let response = await axios.get(`https://api-lifeformula.com/api/userProfile`)
        userInfo.value = response.data.user
        if(response.data.userDetails){
            hasShippingInfo.value = true
            userShippingInfo.value = response.data.userDetails
            loadingShippingInfo.value = false
        }
        else if(response.data.userDetails == null){            
            loadingShippingInfo.value = false
            hasShippingInfo.value = false
        }
        checkOutDialog.value = true

    }
    else{
        scrollToTop()
        push('login')
    }
}


const orderDetails = ref()
const OpenPaymentDialog = () => {
    paymentDialog.value = true
    orderDetails.value = CartItems.value.map(function(obj : any) {
  return {
    quantity: obj.quantity,
    ...obj.product
  };
}); 
}


const payNow = async() => {
    console.log(CartItems.value);
    LoadingPayButton.value = true
    let orderReq = {
        products : CartItems.value,
    }
    const response = await axios.post('https://api-lifeformula.com/api/create-checkout-session',orderReq);
        const sessionId = response.data.sessionId;
        console.log(sessionId);
        LoadingPayButton.value = true
        
        const stripe = Stripe('pk_test_51NlVKQKQG7NeLaUweBLymb8qv7z753Rz3hQxPKU715o2N0GjxIaB8QfYyq9fSAS1I9lMko1TCh13DjGgSw342yMC00xdvFq5i3');  
        stripe.redirectToCheckout({
            sessionId: sessionId,
        }).then(function (result : any) {
            console.log(result);
            LoadingPayButton.value = false
          if (result.error) {
            console.error(result.error.message);
        }
        else{
              console.error(result);
          }
    });    
}

const updateTotal = () => {
    let total = 0
    CartItems.value.forEach((product:any) => {
        let totalString = document.getElementById(`totaaal${product.product.id}`)
        let totalPrice : any = totalString!.innerText.match(/\d+(\.\d+)?/)[0] as any;
        totalPrice = parseFloat(totalPrice);
        console.log(totalPrice);
        total += totalPrice
    });
    let estimatedTotal = document.getElementById('estimatedTotal')
    estimatedTotal!.innerText = `Estimated Total : ${total.toFixed(2)}$`
}


const RemoveFromCart = async(cartId : number , productId : number) => {
    if(Authenticated.value == true){
        let response = await axios.delete(`https://api-lifeformula.com/api/cart/delete/${cartId}`)
        console.log(response.data.message);        
    }
    else{
        let UpdatedCart = CartItems.value.filter((item:any) => item.product.id !== productId);
        CartItems.value = UpdatedCart
        UpdatedCart = AES.encrypt(UpdatedCart , 'EncryptionKey_liformula24').toString()
        localStorage.setItem('LF-Cart',JSON.stringify(UpdatedCart))
    }
    location.reload()
}

const getUserCart = async () => {
    if(Authenticated.value == true) {
        let response = await axios.get('https://api-lifeformula.com/api/cart')
        CartItems.value = response.data.cart
        setTimeout(() => {
            updateTotal()
        }, 600);
    }
    else{
        let localCart = localStorage.getItem('LF-Cart');
        if(localCart){
            let decryptedCart = AES.decrypt(localCart , 'EncryptionKey_liformula24').toString(enc.Utf8)
            let parsedCart = JSON.parse(decryptedCart) 
            CartItems.value = parsedCart
            console.log(CartItems.value );
            
        }
    }
}
onBeforeMount(() => {
  if(token){
    Authenticated.value = true
    let decrypted_token = AES.decrypt(token , 'EncryptionKey_liformula24').toString(enc.Utf8)        
    axios.defaults.headers.common['Authorization'] = `Bearer ${decrypted_token}`
  }
  getUserCart();
})

</script>

<template>
    <Dialog v-model:visible="checkOutDialog" modal header="Confirm Checkout" :style="{ width: '60vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
        <div v-if="loadingShippingInfo" class="flex w-full justify-content-center">
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
                point_of_sale
            </span>
            <h4 class="text-center p-2 my-2">Welcome, {{ userInfo.name }}</h4>
            <p class="GrotesqueFont text-xl text-center my-3">Please confirm your shipping info before Submitting checkout</p>
            <!-- <p v-if="!hasShippingInfo" class="GrotesqueFont text-xl my-3 text-center">Your didn't complete filling your shipping address, please complete it so you can be able to complete your order</p> -->
            <div v-if="hasShippingInfo" class="surface-100 p-3 w-10 m-auto widthFull" style="border-radius: 5px;">
                    <span class="material-symbols-outlined text-4xl m-auto flex justify-content-center">
                        contact_mail
                    </span>
                    <hr>
                    <p class="GrotesqueFont text-center m-1">Shipping Address : {{ userShippingInfo.address }}</p>
                    <p class="GrotesqueFont text-center m-1">Shipping City : {{ userShippingInfo.city }}</p>
                    <p class="GrotesqueFont text-center m-1">Shipping State : {{ userShippingInfo.state }}</p>
                    <p class="GrotesqueFont text-center m-1">Zip Code : {{ userShippingInfo.zip_code }}</p>
                    <p class="GrotesqueFont text-center m-1">Phone Number : {{ userShippingInfo.phone }}</p>
            </div>
        </div>
        <template #footer>
            <Button class="textSmMob mt-2" label="Edit your info" icon="pi pi-user-edit" @click="push('/profile')" text />
            <Button v-if="hasShippingInfo" class="textSmMob mt-2" label="Continue For Checkout" icon="pi pi-shopping-bag" @click="OpenPaymentDialog(); checkOutDialog = false" autofocus />
        </template>
    </Dialog>    

    <Dialog v-model:visible="paymentDialog" modal header="Confirm Checkout" :style="{ width: '60vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
        <div>
            <span class="material-symbols-outlined text-6xl greenLogoColor text-center my-2 m-auto flex justify-content-center cursor-pointer">
                point_of_sale
            </span>
            <!-- <h4 class="text-center p-2 my-2">Welcome, {{ userInfo.name }}</h4> -->
            <p class="GrotesqueFont text-xl text-center">Order Details</p>
            <div class="surface-100 widthFull p-3 w-11 m-auto" style="border-radius: 5px;">
                    <!-- <span class="material-symbols-outlined text-4xl m-auto flex justify-content-center">
                        dvr
                    </span> -->
                    <img src="../assets/LifeFourmlaLogo.png" class="w-3 width70 flexxMob m-auto" alt="">
                    <hr>
                    <div class="card widthFull">
                        <!-- {{ orderDetails[0] }} -->
                        <DataTable :value="orderDetails" tableStyle="min-width: 50rem">
                            <Column field="name" header="Name"></Column>
                            <Column field="categoryName" header="Category"></Column>
                            <Column field="price" header="Price"></Column>
                            <Column field="quantity" header="quantity"></Column>
                        </DataTable>
                    </div>
                </div>
                <p class="GrotesqueFont text-center widthFull w-8 m-auto my-2 fontSm">Most orders deliver in 3-5 Business Days. Orders placed after 3 p.m. Central are considered placed the next business day.</p>
                <hr>
                <div class=" m-auto widthFull flex align-items-center justify-content-center my-2">
                    <label for="chbx mx-2 text-center fontSm" style="text-align: center;">My billing information is the same as my shipping information</label>
                    <Checkbox id="chbx" class="mx-2" v-model="ShippingTermsConditions" binary aria-describedby="chbx-error" />
                </div>
                <div class=" m-auto flex align-items-center justify-content-center my-2">
                    <label for="chbx mx-2 text-center">Standard Shipping: $6.45</label>
                    <Checkbox id="chbx" class="mx-2" v-model="ShippingStandard" binary aria-describedby="chbx-error" />
                </div>
        </div>
        <template #footer>
            <Button v-if="ShippingTermsConditions && ShippingStandard" :loading="LoadingPayButton" class="textSmMob mt-2 px-5" label="Pay Now" icon="pi pi-credit-card" @click="payNow()" autofocus />
            <Button v-else disabled class="textSmMob mt-2 px-5" label="Pay Now" icon="pi pi-credit-card" @click="paymentDialog = true;  checkOutDialog = false" autofocus />
        </template>
    </Dialog>    


    <div class="flex paddingMob p-5 justify-content-center" style="padding-top: 20vh !important; background-color: #F5F5F8;">
        <div v-if="CartItems.length > 0">
            <h1 class="text-center">Cart</h1>
            <p class="p-4 GrotesqueFont text-center bg-white" style="border-radius: 7px;">
                A $6.95 flat rate standard shipping fee applies.
            </p>
            <div class="p-3 flex flex-column justify-content-center bg-white" style="border-radius: 7px;">
                <div class="flex columnnMob my-2 justify-content-center surface-100 py-4 w-full align-items-center" style="border-radius: 8px;" v-for="(item,index) in CartItems" :key="index">
                    <img :src="item.product.image" class="w-6 lg:w-3 mx-3 cursor-pointer width80" style="border-radius: 8px;" @click="push(`/products/${item.product.id}`)" alt="">
                    <div class="flex flex-column mx-4 mt-3 w-10">
                        <h4 class="GrotesqueFont textAlignCenter">{{ item.product.name }}</h4>
                        <h5 class="GrotesqueFont textAlignCenter my-2 fontMd">{{ item.product.categoryName }}</h5>
                        <div class="flex justify-content-between mgMob">
                            <h4 class="GrotesqueFont logoSecondaryColor">{{ item.product.price }}$</h4>
                            <div>
                                <h5 :id="`totaaal${item.product.id}`" class="GrotesqueFont logoSecondaryColor" v-if="item.quantity < 3 ">Total : {{ (item.product.price * item.quantity).toFixed(2) }}$</h5>
                                <h5 :id="`totaaal${item.product.id}`" class="GrotesqueFont logoSecondaryColor" v-else-if="item.quantity >= 3 && item.quantity < 6 && item.product.sale_on_3">
                                Total : {{ ((item.quantity * item.product.price) - ( (item.quantity * item.product.price) * (item.product.sale_on_3 / 100) )).toFixed(2) }}$
                                </h5>
                                <h5 :id="`totaaal${item.product.id}`" class="GrotesqueFont logoSecondaryColor" v-else-if="item.quantity >= 3 && item.quantity < 6 && item.product.sale_on_6">
                                Total : {{ ((item.quantity * item.product.price) - ( (item.quantity * item.product.price) * (item.product.sale_on_6 / 100) )).toFixed(2) }}$
                                </h5>
                                <h5 :id="`totaaal${item.product.id}`" class="GrotesqueFont logoSecondaryColor" v-else-if="item.quantity >= 3 && item.quantity < 6 && item.product.sale_on_9">
                                Total : {{ ((item.quantity * item.product.price) - ( (item.quantity * item.product.price) * (item.product.sale_on_9 / 100) )).toFixed(2) }}$
                                </h5>
                                <h5 :id="`totaaal${item.product.id}`" class="GrotesqueFont logoSecondaryColor" v-else>
                                Total : {{ (item.quantity * item.product.price).toFixed(2)}}$ 
                                </h5>
                                <div class="flex align-items-center cursor-pointer dnoneMob" @click="RemoveFromCart(item.id , item.product.id)" style="">                                    
                                    <h5 class="GrotesqueFont mt-2 hover:text-cyan-900">Remove</h5>
                                    <span class="material-symbols-outlined text-4xl">delete</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex mgAutoMob FlexColumn sm:flex-column md:flex-column MargAutoMob lg:flex-row my-1 productDetailss align-items-center lg:justify-content-between w-9 sm:m-auto md:m-auto lg:m-0">
                            <InputNumber @click="updateTotal()" v-model="item.quantity" showButtons buttonLayout="horizontal" class="productDetailss text-center inputNumberr" style="width: 2rem"
                            decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus"
                             decrementButtonIcon="pi pi-minus" :min="1" :max="100" />
                        </div>
                        <div class="flex md:hidden lg:hidden align-items-center justify-content-center cursor-pointer" @click="RemoveFromCart(item.id , item.product.id)" style="">                                    
                            <h5 class="GrotesqueFont mt-2 hover:text-cyan-900">Remove</h5>
                            <span class="material-symbols-outlined text-4xl">delete</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-10 m-auto my-4">
                <hr>
                    <h3 class="pt-2 text-center GrotesqueFont" id="estimatedTotal">
                        Estimated Total : 
                    </h3>
                    <p class="text-center GrotesqueFont">Shipping and taxes will be calculated during checkout</p>
                    <h4 @click="checkOut()" class="width80 p-3 w-5 cursor-pointer px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4">Buy Now</h4>
                    <h6 class="p-2 text-center GrotesqueFont" v-if="!Authenticated">
                       <router-link @click="scrollToTop()" to="/login">Log in</router-link> to save your cart between sessions
                    </h6>
            </div>
        </div>
        <div v-else class="flex flex-column text-center my-5">
            <h1 class="GrotesqueFont">Sorry! Your Cart is still Empty</h1>
            <router-link to="/products"  @click="scrollToTop()" class="width80 p-3 px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4">SHOP NOW</router-link>
        </div>
        <!-- <div class="w-7">
            <button>CheckOut</button>
        </div> -->
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
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
.GrotesqueFont{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
.productDetailss .p-inputtext {
    width: 9vh !important;
    text-align: center !important;
}
@media screen and (max-width : 570px){
    .columnnMob{
        flex-direction: column !important;
    }
    .paddingMob{
        padding: 10vh 1vh !important;
    }
    .textAlignCenter{
        text-align: center !important;
    }
    .mgAutoMob{
        margin: 2vh auto !important;
    }
    .mgMob{
        margin: 2vh 0 !important;
    }
    .justifyCenter{
        justify-content: center !important;
    }
    .widthFull{
        width: 100% !important;
    }
    .productDetailss .p-inputtext {
        margin: auto;
        width: 100% !important;
        text-align: center !important;
    }
    .fontSm{
        font-size: 12px !important;
    }
    .fontMd{
        font-size: 14px !important;
    }
    .productDetailss .p-inputnumber {
        width: 100% !important;
    }
    .width80{
        width: 100% !important;
    }
    .width70{
        width: 70% !important;
        margin: auto !important;
    }
    .flexxMob{
        display: flex !important;
    }
    .dnoneMob{
        display: none !important;
    }
}
</style>