<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import { ref , onBeforeMount } from 'vue'
import Button from 'primevue/button';
import axios from "axios";
import { useRouter } from 'vue-router';
import { AES, enc } from 'crypto-js';
import DashBoardSideBar from '@/components/DashBoardSideBar.vue'

const loading = ref(false)
const CategorySaved = ref(false)
const dbErr = ref(false)
const { push } = useRouter();

const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
    if(response.data.userRole == 'user'){
        push('/')
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
const createCategory = (req : any) => {
    loading.value = true
    console.log(req);
    axios.post('https://api-lifeformula.com/api/categories/create',req).then((result) => {
        console.log(result);
        loading.value = false
        CategorySaved.value = true
        setTimeout(() => {
            location.reload()
        }, 1500);
    }).catch((err) => {
        console.log(err);
        dbErr.value = true
        loading.value = false
    });

}
</script>
<template>
    <DashBoardSideBar></DashBoardSideBar>
    <div class="bgImg p-5 mx-5" style="margin-top: 15vh !important;">
        <h2 class="text-center fontt my-3">Add Categories</h2>
        <FormKit type="form" :actions="false" @submit="createCategory">
            <p v-if="CategorySaved" class="p-3 text-white px-3 w-6 text-center m-auto" style="border-radius: 10px; background-color: rgb(2, 156, 2);">Product Saved Successfully!</p>
            <p class="formkit-message text-center my-2 mt-4 w-8 m-auto" v-if="dbErr">This Category already exists</p>
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <label for="categoryName" class="px-1 fontt">Category Name</label>
                </div>
                <FormKit id="categoryName" type="text" label="Category Name" placeholder="Enter your category name" name="name" validation="required" />
            </div>
            <Button type="submit" class="submitBtn" label="Submit" :loading="loading" />
        </FormKit>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.fontt{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
.bgImg{
    background: #1a1b20 url('../../assets/bggGredient2.jpg') fixed;
    background-size: cover;
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
    margin: 4vh auto;
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
    text-align: center !important;
}
.formkit-label{
    display: none;
    padding: 1vh;
}

</style>