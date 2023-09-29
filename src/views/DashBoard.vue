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
let OptionsValue = ref('Create');
const options = ref(['Create','Update']);
const loading = ref(false)
const ProductSaved = ref(false)
const userInfo = ref()



const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
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



</script>
<template>
    <DashBoardSideBar></DashBoardSideBar>
    <div class="bgImg h-full p-5 padding1 paddingTop login dashboard">
        <div class="slidedown animation-iteration-1 animation-duration-1000 lg:p-5 md:p-4 sm:p-3 padding1 w-11 widthFull my-5 m-auto flex flex-column justify-content-center" style="background-color: rgba(255, 255, 255, 0.591); margin-top: 10vh !important; border-radius: 5px;">
            <div class="card p-3 flex flex-column align-items-center justify-content-center">
                <h2 class="text-center py-3 fontt">Welcome {{ userInfo.name.split(' ').slice(0, 1).join(' ') }}, to your admin panel</h2>
                <p class="fontt">you can navigate to any page in the admin panel by clicking on the widgets icon on the left of the page</p>
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


                <!-- <TabMenu v-model:activeIndex="active" :model="items">
                    <template #item="{ item }">
                        <router-link class="mx-2 flex align-items-center" v-if="item.route" v-slot="routerProps" :to="item.route">
                            <div class="mx-2 flex align-items-center">
                                <span class="material-symbols-outlined text-3xl">
                                    {{ item.icon }}
                                </span>
                                <h2 class="fontt text-2xl">{{ item.label }}</h2>
                            </div>
                        </router-link>
                    </template>
                </TabMenu> -->
                <!-- <h2 class="text-center py-3 fontt">Welcome {{ userInfo.name }}, to your admin panel</h2> -->