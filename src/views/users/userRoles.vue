<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import { ref , onBeforeMount } from 'vue'
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';
import axios from "axios";
import { useRouter } from 'vue-router';
import { AES, enc } from 'crypto-js';
import DashBoardSideBar from '@/components/DashBoardSideBar.vue'

const loading = ref(false)
const UsersLoading = ref(true)
const selectedUser = ref()
const selectedRole = ref()
const users = ref()
const userSaved = ref(false)
const validationErr = ref(false)
const { push } = useRouter();
const roles = [{
    name : 'user',
    code : 'user'
},
{
    name : 'admin',
    code : 'admin'
},
{
    name : 'moderator',
    code : 'moderator'
},
]

const getUsers = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/users');
    users.value = response.data.users.map((obj : any) => {
        return { name: `${obj.email} : ${obj.type}` , code: obj.id };
    });
    UsersLoading.value = false
}
const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
    if(response.data.userRole == 'user' || response.data.userRole == 'moderator'){
        push('/')
    }
    else{
        getUsers()
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
const updateUserRole = () => {
    loading.value = true
    if(!selectedUser.value || !selectedRole.value){
        validationErr.value = true
        loading.value = false
        return
    }
    let req = {
        id : selectedUser.value.code , 
        type : selectedRole.value.code
    }
    console.log(req);  
    axios.post('https://api-lifeformula.com/api/userRole/update',req).then((result) => {
        console.log(result);
        loading.value = false
        userSaved.value = true
        setTimeout(() => {
            location.reload()
        }, 1500);
    }).catch((err) => {
        console.log(err);
    });

}
</script>
<template>
    <DashBoardSideBar></DashBoardSideBar>
    <div class="bgImg p-5 mx-5" style="margin-top: 15vh !important;">
        <h2 class="text-center fontt my-3">Manage Users</h2>
        <div v-if="!UsersLoading" class=" flex flex-column justify-content-center w-5 my-3 py-3 m-auto">
            <p v-if="userSaved" class="p-3 my-2 text-white px-3 w-full text-center m-auto" style="border-radius: 10px; background-color: rgb(2, 156, 2);">User role Saved Successfully!</p>
            <p class="formkit-message text-center my-2 mt-4 w-8 m-auto" v-if="validationErr">Please choose a user and role</p>
            <Dropdown v-model="selectedUser" :options="users" filter  showClear optionLabel="name" placeholder="Select a user" class="w-full" />
            <Dropdown v-model="selectedRole" :options="roles" showClear optionLabel="name" placeholder="Select a user role" class="w-full my-3" />
            <Button type="submit" class="submitBtn my-2" label="Save" @click="updateUserRole" :loading="loading" />
        </div>
    </div>
</template>

<style scoped>
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
.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }
  
  .divider-line {
    flex-grow: 1;
    height: 1px;
    background-color: #ccc;
  }
  
  .divider-text {
    margin: 0 10px;
    color: #999;
    font-weight: bold;
  }
</style>