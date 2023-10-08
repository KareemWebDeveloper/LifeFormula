<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import { ref , onBeforeMount, Ref } from 'vue'
import Button from 'primevue/button';
import axios from "axios";
import { useRouter } from 'vue-router';
import { AES, enc } from 'crypto-js';
import DashBoardSideBar from '@/components/DashBoardSideBar.vue'
import SelectButton from 'primevue/selectbutton';
import Dropdown from 'primevue/dropdown'

type optionsValueTypes = 'Add Categories' | 'Edit Categories' | 'Delete Categories'
let OptionsValue : Ref<optionsValueTypes> = ref('Add Categories');
const options = ref(['Add Categories','Edit Categories' , 'Delete Categories']);

const loading = ref(false)
const CategorySaved = ref(false)
const selectedCategory = ref()
const UpdatedCategory = ref()
const categories = ref()
const dbErr = ref(false)
const { push } = useRouter();

const checkUserRole = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/userRole');
    if(response.data.userRole == 'user'){
        push('/')
    }
}

const getCategories = async () => {
    let response = await axios.get('https://api-lifeformula.com/api/categories');
    categories.value = response.data.Categories.map((obj : any) => {
        return { name: obj.name, code: obj.id };
    });
    console.log(categories.value);
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

const updateCategory = () => {
    loading.value = true
    let req = {
        name : UpdatedCategory.value
    }
        axios.put(`https://api-lifeformula.com/api/categories/update/${selectedCategory.value.code}` , req).then((result) => {
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

const deleteCategory = () => {
    loading.value = true
        axios.delete(`https://api-lifeformula.com/api/categories/remove/${selectedCategory.value.code}`).then((result) => {
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
        <div class="flex justify-content-center py-4">
            <SelectButton v-model="OptionsValue" :options="options" class="productDetails" aria-labelledby="basic" />
        </div>
        <FormKit v-if="OptionsValue == 'Add Categories'" type="form" :actions="false" @submit="createCategory">
            <p v-if="CategorySaved" class="p-3 text-white px-3 w-6 text-center m-auto" style="border-radius: 10px; background-color: rgb(2, 156, 2);">Category Saved Successfully!</p>
            <p class="formkit-message text-center my-2 mt-4 w-8 m-auto" v-if="dbErr">This Category already exists</p>
            <div class="mt-3">
                <div class="flex align-items-center justify-content-center">
                    <label for="categoryName" class="px-1 fontt">Category Name</label>
                </div>
                <FormKit id="categoryName" type="text" label="Category Name" placeholder="Enter your category name" name="name" validation="required" />
            </div>
            <Button type="submit" class="submitBtn" label="Submit" :loading="loading" />
        </FormKit>
        <div v-else-if="OptionsValue == 'Edit Categories'" class="w-5 m-auto">
            <p v-if="CategorySaved" class="p-3 text-white px-3 w-6 text-center m-auto" style="border-radius: 10px; background-color: rgb(2, 156, 2);">Category Updated Successfully!</p>
            <Dropdown v-model="selectedCategory" :options="categories" filter  showClear optionLabel="name" placeholder="Select a category" class="w-full" />
            <input v-if="selectedCategory" type="text" class="formkit-input my-3" v-model="UpdatedCategory" placeholder="Enter your new category name">
            <div class="flex justify-content-center">
                <Button type="button" class="submitBtn mx-2" label="Update" @click="updateCategory" :loading="loading" />
            </div>
        </div>
        <div v-else class="w-5 m-auto">
            <p v-if="CategorySaved" class="p-3 text-white px-3 w-6 text-center m-auto" style="border-radius: 10px; background-color: rgb(2, 156, 2);">Category Deleted Successfully!</p>
            <Dropdown v-model="selectedCategory" :options="categories" filter  showClear optionLabel="name" placeholder="Select a category" class="w-full" />
            <div class="flex justify-content-center">
                <Button type="button" class="submitBtn mx-2" label="Delete" @click="deleteCategory" :loading="loading" />
            </div>
        </div>
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