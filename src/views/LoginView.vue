<script setup lang="ts">
import SelectButton from 'primevue/selectbutton';
import { ref , onBeforeMount } from 'vue';
import axios from "axios";
import { AES,enc } from 'crypto-js';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { FormKit } from '@formkit/vue';
let OptionsValue = ref('Sign in');
const options = ref(['Sign in','Sign up']);

const { push } = useRouter();
let isErrorVisible = ref(false)
let ErrorMsg = ref('')

let loading = ref(false)
let token = localStorage.getItem('LF_Token')
const Authenticated = ref(false)
onBeforeMount(() => {
  if(token){
    Authenticated.value = true
    let decrypted_token = AES.decrypt(token , 'EncryptionKey_liformula24').toString(enc.Utf8)        
    axios.defaults.headers.common['Authorization'] = `Bearer ${decrypted_token}`
  }
})

const logout = () => {
    localStorage.removeItem('LF_Token');
    location.reload()
}

const loginSubmitHandler = (req : any) => {
    loading.value = true
    console.log(req);
    axios.post("https://api-lifeformula.com/api/login",req).then((response) => {
        console.log(response);
        let token = response.data.Token;
        let encryptedToken = AES.encrypt(token , 'EncryptionKey_liformula24').toString()
        localStorage.setItem('LF_Token',encryptedToken)
        loading.value = false
        push('/').then(() => {
            location.reload()
        })
    }).catch((error) => {
        isErrorVisible.value = true
        console.log(error.response);
        ErrorMsg.value = error.response.data.message
        loading.value = false
    });
}

const registerSubmitHandler = (req : any) => {
    loading.value = true
    req.password_confirmation = req.password_confirm
    delete req.password_confirm
    console.log(req);
    axios.post("https://api-lifeformula.com/api/register",req).then((response) => {
        console.log(response);
        let token = response.data.Token;
        let encryptedToken = AES.encrypt(token , 'EncryptionKey_liformula24').toString()
        localStorage.setItem('LF_Token',encryptedToken)
        loading.value = false
        push('/').then(() => {
            location.reload()
        })
    }).catch((error) => {
        isErrorVisible.value = true
        console.log(error.response.data.message);
        ErrorMsg.value = error.response.data.message
        loading.value = false
    });
}
</script>
<template>
    <div class="bgImg h-full p-5 padding1 paddingTop login">
        <div v-if="Authenticated" class="my-5 flex flex-column justify-content-center align-items-center" style="margin: 20vh auto !important;">
            <h1>You are already logged in!</h1>
            <div class="flex w-8">
                    <h4 @click="logout()"  style="border-radius: 10px;" class="flex w-4 align-items-center justify-content-center width80 p-3 cursor-pointer px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4"><span class="material-symbols-outlined text-4xl mx-2">logout</span> Logout</h4>
                    <h4 @click="push('/')" class="flex align-items-center justify-content-center width80 p-3 w-4 cursor-pointer px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4"><span class="material-symbols-outlined text-4xl mx-2">home</span>Home Page</h4>
            </div>
        </div>
        <div v-else class="slidedown animation-iteration-1 animation-duration-1000 lg:p-5 md:p-4 sm:p-3 padding1 lg:w-7 md:w-9 sm:w-10 widthFull my-5 m-auto flex flex-column justify-content-center" style="background-color: rgba(255, 255, 255, 0.591); border-radius: 5px;">
            <h1 class="text-center font21 padding1 fontt lg:pt-5">Welcome To Life Formula</h1>
            <div class="flex justify-content-center">
                <SelectButton v-model="OptionsValue" :options="options" class="productDetails" aria-labelledby="basic" />
            </div>
            <!-- Error Message -->
            <p class="formkit-message text-center my-2 mt-4 w-6 m-auto" v-if="isErrorVisible">{{ ErrorMsg }}</p>

            <!-- Login Form and register  -->
            <div v-if="OptionsValue == 'Sign in' || OptionsValue == ''">
                <FormKit type="form" :actions="false" @submit="loginSubmitHandler">
                    <div class="mt-3">
                        <div class="flex align-items-center">
                            <span class="material-symbols-outlined text-3xl">alternate_email</span>
                            <label for="emaill" class="px-1 fontt">Email Address</label>
                        </div>
                        <FormKit prefix-icon="filePdf" id="emaill" type="text" label="Email Address" placeholder="Enter your email address" name="email" validation="required" />
                    </div>
    
                    <div class="mt-3">
                        <div class="flex align-items-center">
                            <span class="material-symbols-outlined text-3xl">vpn_key</span>
                            <label for="pw" class="px-1 fontt">Password</label>
                        </div>
                        <FormKit type="password" id="pw" label="Password" placeholder="Enter your password" name="password" validation="required|password" />
                    </div>
                    <!-- <button type="submit" class="submitBtn">Login</button> -->
                    <Button type="submit" class="submitBtn" label="Login" :loading="loading" />
                </FormKit>
            </div>
            <div v-else>
                <FormKit type="form" :actions="false" @submit="registerSubmitHandler">
                    <div class="mt-3">
                        <div class="flex align-items-center">
                            <span class="material-symbols-outlined text-3xl">person</span>
                            <label for="fname" class="px-1 fontt">Full Name</label>
                        </div>
                        <FormKit id="fname" type="text" label="Full Name" placeholder="Enter your full name" name="name" validation="required|length:2" />
                    </div>
                    <div class="mt-3">
                        <div class="flex align-items-center">
                            <span class="material-symbols-outlined text-3xl">alternate_email</span>
                            <label for="emaill" class="px-1 fontt">Email Address</label>
                        </div>
                        <FormKit id="emaill" type="text" label="Email Address" placeholder="Enter your email address" name="email" validation="required|email" />
                    </div>
    
                    <div class="mt-3">
                        <div class="flex align-items-center">
                            <span class="material-symbols-outlined text-3xl">vpn_key</span>
                            <label for="pw" class="px-1 fontt">Password</label>
                        </div>
                        <FormKit type="password" id="pw" label="Password" placeholder="Enter your password" name="password" validation="required|length:8|alphanumeric" />
                    </div>
                    <div class="mt-3">
                        <div class="flex align-items-center">
                            <span class="material-symbols-outlined text-3xl">vpn_key</span>
                            <label for="pw2" class="px-1 fontt">Confirm Password</label>
                        </div>
                        <FormKit type="password" id="pw2" label="Confirm Password" placeholder="Re-Enter your password" name="password_confirm" validation="required|confirm" />
                    </div>
                    <Button type="submit" class="submitBtn" label="Register" :loading="loading" />
                </FormKit>
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.bgImg{
    background: #1a1b20 url('../assets/Login.jpg') fixed;
    background-size: cover;
}
.formkit-input{
    padding: 1.8vh;
    margin: auto;
    border: none;
    border-radius: 3px;
    width: 100%;
    font-size: 13px;
    background: none;
    border: 2px solid rgba(0, 0, 0, 0.696);
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
    width: 50%;
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