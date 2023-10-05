<script setup lang="ts">
import TabMenu from "primevue/tabmenu";
import axios from "axios";
import { ref , onBeforeMount , onMounted , watch} from 'vue'
import { AES, enc } from 'crypto-js';
import { useRouter, useRoute } from "vue-router";
import DashBoardSideBar from '@/components/DashBoardSideBar.vue'

const router = useRouter();
const route = useRoute();

const { push } = useRouter();
const userInfo = ref()
const userRole = ref()

const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
    userRole.value = response.data.userRole
    if(response.data.userRole == 'user'){
        push('/')
    }
    else{
        let response = await axios.get('https://api-lifeformula.com/api/userProfile')
        userInfo.value = response.data.user
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
    }
})

const active = ref(0);
const items = ref([
    {
        label: 'Home',
        icon: 'home',
        route: '/dashboard',
        path : '/dashboard'
    },
    {
        label: 'Products',
        icon: 'inventory',
        route: '/dashboard/products',
        path: '/dashboard/products'
    },
    {
        label: 'Categories',
        icon: 'category',
        route: '/dashboard/categories',
        path: '/dashboard/categories'
    },
    {
        label: 'Users',
        icon: 'manage_accounts',
        route: '/dashboard/users',
        path: '/dashboard/users',
    },
    {
        label: 'Orders',
        icon: 'view_list',
        route: '/dashboard/orders',
        path: '/dashboard/orders',
    },
]);
watch(
    route,
    () => {
        active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path);
    },
    { immediate: true }
);
onMounted(() => {
    active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path);
    // console.log(active.value);
    
})

const googleAnalytics = () => {
    let link = document.getElementById('googleAnalytics')
    link?.click()
}

</script>
<template>
    <DashBoardSideBar></DashBoardSideBar>
    <div class="bgImg h-full p-5 padding1 paddingTop login dashboard">
        <div class="slidedown animation-iteration-1 animation-duration-1000 lg:p-5 md:p-4 sm:p-3 padding1 w-11 widthFull my-5 m-auto flex flex-column justify-content-center" style="background-color: rgba(255, 255, 255, 0.591); margin-top: 10vh !important; border-radius: 5px;">
            <div class="card p-3 flex flex-column align-items-center justify-content-center">
                <h2 class="text-center py-3">Welcome {{ userInfo.name.split(' ').slice(0, 1).join(' ') }}, to your admin panel</h2>
                <p class="fontt text-center">you can navigate to any page in the admin panel by clicking on the widgets icon on the left of the page</p>
                <p class="mt-5 mb-3">Most Commonly Used</p>
                <div class="flex mb-5 flex-wrap justify-content-center">
                    <div @click="push('/dashboard/products/edit')" class="flex my-2 mx-3 w-17rem greenHoverBg align-items-center justify-content-center surface-100 p-2 cursor-pointer" style="border-radius: 10px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.378);">
                        <span class="material-symbols-outlined icon text-5xl greenLogoColor" style="font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 48 ">database</span>
                        <h3 class="fontt mt-2 mx-1" >Products</h3> 
                    </div>
                    <div v-if="userRole == 'admin'" class="flex my-2 w-18rem mx-3 greenHoverBg align-items-center justify-content-center surface-100 p-2 cursor-pointer" @click="googleAnalytics()" style="border-radius: 10px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.378);">
                        <span class="material-symbols-outlined icon text-5xl greenLogoColor" style="font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 48 ">monitoring</span>
                        <a id="googleAnalytics" class="no-underline text-black" target="_blank" href="https://marketingplatform.google.com/about/analytics/"><h3 class="fontt mt-2 mx-1">Google Analytics</h3></a>
                    </div>
                    <div v-if="userRole == 'admin'"  @click="push('/dashboard/users')" class="flex my-2 mx-3 w-17rem greenHoverBg align-items-center justify-content-center surface-100 p-2 cursor-pointer" style="border-radius: 10px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.378);">
                        <span class="material-symbols-outlined icon text-5xl greenLogoColor" style="font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 48 ">group</span>
                        <h3 class="fontt mt-2 mx-1">Users</h3> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.bgImg{
    background: #1a1b20 url('../assets/bggGredient2.jpg') fixed;
    background-size: cover;
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
.p-tabmenu{
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
}
.p-inputswitch .p-inputswitch-slider{
    background: #27394bd4 ;
}
.dashboard .p-panelmenu , .dashboard .p-component{
width: 100% !important;
}
.formkit-input{
    text-align: center;
    padding: 1.8vh;
    margin: auto;
    border: none;
    border-radius: 3px;
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