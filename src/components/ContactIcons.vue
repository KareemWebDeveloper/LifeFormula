<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { FormKit } from '@formkit/vue';
import Button from 'primevue/button';
import { ref , onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { AES,enc } from 'crypto-js';
import axios from 'axios';
const { push } = useRouter();

const isDialogVisible = ref(false)
let token = localStorage.getItem('LF_Token')
const Authenticated = ref(false)
const formCreated = ref(false)
const loading = ref(false)
const userInfo = ref()
const formModel = ref(userInfo)
onBeforeMount(() => {
  if(token){
    Authenticated.value = true
    let decrypted_token = AES.decrypt(token , 'EncryptionKey_liformula24').toString(enc.Utf8)        
    axios.defaults.headers.common['Authorization'] = `Bearer ${decrypted_token}`
     axios.get('https://api-lifeformula.com/api/userProfile').then((result) => {
         userInfo.value = result.data.user
     }).catch((err) => {
        console.log(err);
     });
  }
})
const openContactUsForm = () => {
    isDialogVisible.value = true
}
const sendMail = (req : any) => {
    console.log(req);
    loading.value = true
    axios.post('https://api-lifeformula.com/api/contact' , req).then((result) => {
        loading.value = false
        formCreated.value = true
    }).catch((err) => {
        console.log(err);
    });
}
</script>
<template>
    <Dialog v-model:visible="isDialogVisible" modal header="Life Formula" :style="{ width: '55vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
        <div v-if="!formCreated" class="ContactUsForm">
            <h4 class="text-center p-2 my-2">Contact Us</h4>
            <p class="GrotesqueFont w-9 width90 text-center m-auto my-2">Please provide us with a valid and active email so we can easily and effectively contact you as soon as possible</p>

            <div  class="surface-100 width100 w-10 m-auto p-4" style="border-radius: 12px;">
                <FormKit type="form" v-model="formModel" :actions="false" @submit="sendMail">
                    <div class="mt-3">
                        <div class="flex px-3 align-items-center">
                            <span class="material-symbols-outlined text-3xl">person</span>
                            <label for="name" class="px-1 fontt">Name</label>
                        </div>
                        <FormKit type="text" id="name" label="Name" placeholder="Enter your name" name="name" validation="required" />
                    </div>
                    <div class="mt-3">
                        <div class="flex px-3 align-items-center">
                            <span class="material-symbols-outlined text-3xl">alternate_email</span>
                            <label for="emaill" class="px-1 fontt">Email Address</label>
                        </div>
                        <FormKit id="emaill" type="text" label="Email Address" placeholder="Enter your email address" name="email" validation="required" />
                    </div>
    
                    <div class="mt-3">
                        <div class="flex px-3 align-items-center">
                            <span class="material-symbols-outlined text-3xl">subject</span>
                            <label for="name" class="px-1 fontt">Subject</label>
                        </div>
                        <FormKit type="text" id="name" label="Name" placeholder="Enter your form subject" name="subject" validation="required" />
                    </div>
                    <div class="mt-3">
                        <div class="flex px-3 align-items-center">
                            <span class="material-symbols-outlined text-3xl">chat</span>
                            <label for="msg" class="px-1 fontt">Message</label>
                        </div>
                        <FormKit id="msg" type="textarea" label="Message" placeholder="Write your message" name="message" validation="required|length:10" />
                    </div>
                    <!-- <button type="submit" class="submitBtn">Login</button> -->
                    <Button type="submit" class="submitBtn" label="Send" :loading="loading" />
                </FormKit>
            </div>
        </div>
        <div v-else>
            <span class="material-symbols-outlined text-6xl greenLogoColor text-center my-2 m-auto flex justify-content-center cursor-pointer">
                task_alt
            </span>
            <h5 class="GrotesqueFont w-10 text-center m-auto my-2">We have received your mail successfully and will reach you as soon as possible</h5>
            <p class="GrotesqueFont w-full text-center mt-5">thank you for contacting life formula!</p>
        </div>
    </Dialog>
    <div style="z-index: 11; position: fixed; bottom: 5vh; right: 5vh;">
            <div class="">
                <span class="ContactUs material-symbols-outlined" @click="openContactUsForm">
                    forward_to_inbox
                </span>
            </div>
        </div>

</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.GrotesqueFont{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
.ContactUs{
    background-color: #00a650;
    border-radius: 50%;
    color: white;
    text-align: center;
    margin: 0 !important;
    padding: 1.6vh !important;
    font-size: 40px !important;
    font-weight: bolder;
    cursor: pointer;
    transition-duration: 0.2s;
}
.ContactUs:hover{
    background-color: #00a650c7 !important;
    border-radius: 50%;
    color: white;
    padding: 1.9vh !important;
    font-size: 45px !important;
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
.ContactUsForm .formkit-form{
    margin: 2vh auto;
    width: 100%;
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
@media screen and (max-width : 570px){
    .width100{
        width: 100% !important;
        margin: auto !important;
    }
    .width90{
        width: 95% !important;
    }
}
</style>