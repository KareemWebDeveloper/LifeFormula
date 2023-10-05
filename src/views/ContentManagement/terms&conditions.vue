<script setup lang="ts">
import DashBoardSideBar from '../../components/DashBoardSideBar.vue'
import { ref, onBeforeMount } from 'vue';
import type {Ref} from 'vue'
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Editor from 'primevue/editor';
import axios from "axios";
import { useRouter } from 'vue-router';
import { AES, enc } from 'crypto-js';
const { push } = useRouter();
type optionsValueTypes = 'Terms & Conditions' | 'Privacy Policy' | 'Shipping Policies' | 'Returns Policies'
let OptionsValue : Ref<optionsValueTypes> = ref('Terms & Conditions');
const options = ref(['Terms & Conditions','Privacy Policy' , 'Shipping Policies' , 'Returns Policies']);
const pagesContent = ref()
const loading = ref(false)
const updatedSucessfully = ref(false)

const getContent = () => {
     axios.get('https://api-lifeformula.com/api/terms-conditions').then((result) => {
        pagesContent.value = result.data.termsAndConditions[0]
     }).catch((err) => {
        console.log(err);
        
     });
}

const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
    if(response.data.userRole == 'user'){
        push('/')
    }
    else{
        getContent()
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

const updateContent = () => {
    loading.value = true
    axios.post('https://api-lifeformula.com/api/terms-conditions/update/1' , pagesContent.value).then((result) => {
        console.log(result);
        loading.value = false
        updatedSucessfully.value = true
        setTimeout(() => {
            location.reload()
        }, 2000);
     }).catch((err) => {
        console.log(err);
     });
}

</script>
<template>
    <DashBoardSideBar></DashBoardSideBar>
    <div class="bgImg" style="padding-top: 15vh !important;">
        <div class="w-11 m-auto">
            <div class="flex justify-content-center py-5">
                <SelectButton v-model="OptionsValue" :options="options" class="productDetails" aria-labelledby="basic" />
            </div>
            <p v-if="updatedSucessfully" class="p-3 text-white px-3 w-6 my-3 text-center m-auto" style="border-radius: 10px; background-color: rgb(2, 156, 2);">Content Saved Successfully!</p>
            <div v-if="OptionsValue == 'Terms & Conditions'">
                <div class="card w-9 m-auto p-3">
                    <Editor id="articlee" v-model="pagesContent.terms_conditions" placeholder="Enter Life Formula's terms and conditions" editorStyle="height: 360px" />
                </div>
            </div>
            <div v-if="OptionsValue == 'Privacy Policy'">
                <div class="card w-9 m-auto p-3">
                    <Editor id="articlee" v-model="pagesContent.privacy_policy" placeholder="Enter Life Formula's Privacy Policies" editorStyle="height: 360px" />
                </div>
            </div>
            <div v-if="OptionsValue == 'Returns Policies'">
                <div class="card w-9 m-auto p-3">
                    <Editor id="articlee" v-model="pagesContent.returns_policies" placeholder="Enter Life Formula's Returns Policies" editorStyle="height: 360px" />
                </div>
            </div>
            <div v-if="OptionsValue == 'Shipping Policies'">
                <div class="card w-9 m-auto p-3">
                    <Editor id="articlee" v-model="pagesContent.shipping_policies" placeholder="Enter Life Formula's Shipping Policies" editorStyle="height: 360px" />
                </div>
            </div>
            <div class="w-5 m-auto">
                <Button type="submit" class="submitBtn" label="Update Content" :loading="loading" @click="updateContent" />
            </div>
        </div>     
    </div>
</template>
<style>
.bgImg{
    background: #1a1b20 url('../../assets/bggGredient2.jpg') fixed;
    background-size: cover;
}
</style>