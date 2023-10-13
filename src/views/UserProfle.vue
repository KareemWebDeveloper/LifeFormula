<script setup lang="ts">
import { onBeforeMount , ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";
import { AES, enc } from 'crypto-js';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import type { Ref } from 'vue';
const { push } = useRouter();
const userInfo = ref()
const hasShippingInfo = ref(false)
const userUpdatedSuccessfully = ref(false)
const loading = ref(false)
const isResetPwErrorVisible = ref(false)
const isErrorVisible = ref(false)
const ErrorMsg = ref()
const ResetPwErrorMsg = ref()
let token = localStorage.getItem('LF_Token')
const dbError = ref(false)
const genderOptions = ['male','female','prefer not to say']
const stateOptions = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
const getUserInfo = async() => {
    let response = await axios.get('https://api-lifeformula.com/api/userProfile')
    userInfo.value = response.data
    if(response.data.userDetails){
        hasShippingInfo.value = true
    }
}
type profileOptions = 'Profile Details' | 'Reset Password' | 'Your Orders'
const OptionsValue : Ref<profileOptions> = ref('Profile Details');
const options = ref(['Profile Details', 'Reset Password' , 'Your Orders']);
onBeforeMount(() => {
    if(!token){
        push('/')
    }
    else{
        let decrypted_token = AES.decrypt(token , 'EncryptionKey_liformula24').toString(enc.Utf8)        
        axios.defaults.headers.common['Authorization'] = `Bearer ${decrypted_token}`
        getUserInfo()
    }
})

const submitProfileInfo = (req : any) => {
    loading.value = true

    console.log(req);
    if(hasShippingInfo.value){
      axios.put('https://api-lifeformula.com/api/userProfile/update',req).then((result) => {
          console.log(result);
          userUpdatedSuccessfully.value = true
          isErrorVisible.value = false
            loading.value = false
            setTimeout(() => {
                location.reload()
            }, 800);
        }).catch((err) => {
            console.log(err);
            isErrorVisible.value = true
            ErrorMsg.value = err.response.data.message
            loading.value = false
        });  
    }  
    else{
        axios.post('https://api-lifeformula.com/api/userProfile/create',req).then((result) => {
          console.log(result);
          userUpdatedSuccessfully.value = true
          isErrorVisible.value = false
            loading.value = false
            setTimeout(() => {
                location.reload()
            }, 800);
        }).catch((err) => {
            console.log(err);
            isErrorVisible.value = true
            ErrorMsg.value = err.response.data.message
            loading.value = false
        });  
    } 
}

const resetPw = (req : any) => {
    loading.value = true
    req.new_password_confrimation = req.new_password_confirm
    console.log(req);
    axios.post('https://api-lifeformula.com/api/resetPw',req).then((result) => {
        console.log(result);
        userUpdatedSuccessfully.value = true
        isResetPwErrorVisible.value = false
        loading.value = false
        setTimeout(() => {
            location.reload()
        }, 800);
    }).catch((err) => {
        console.log(err);
        loading.value = false
        isResetPwErrorVisible.value = true
        ResetPwErrorMsg.value = err.response.data.message
    });
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
const logout = () => {
    localStorage.removeItem('LF_Token')
    push('/').then((result) => {
        location.reload()
    })
}
</script>

<template>
    <div class="padding10" style="background-color: #F5F5F8; padding: 20vh 0">
        <div v-if="userInfo" class="p-5 padding0 widthFull w-8 m-auto" style="background-color: white; border-radius: 15px;">
            <div class="userProfile w-10 my-5 MobWidth100 flex justify-content-center align-items-center m-auto mgAuto mgtop">
                <SelectButton v-model="OptionsValue" :options="options" class="productDetails" aria-labelledby="basic" />
            </div>
            <h2 class="text-center">welcome, {{ userInfo.user.name }}</h2>
            <div v-if="OptionsValue == 'Profile Details'">
                <p v-if="!hasShippingInfo" class="text-center GrotesqueFont">please complete your shipping info so you can be able to complete your orders</p>
                <p v-else class="text-center GrotesqueFont">You can edit your profile info from here</p>
                <hr>
                <div class="py-4" style="background: url('https://github.com/KareemWebDeveloper/LifeFormulaImages/blob/main/Images/bggGredient2.jpg?raw=true') fixed ; background-size: cover; background-color: rgba(255, 255, 255, 0.911); background-blend-mode: multiply; border-radius: 10px;">
                    <p class="formkit-message text-center my-2 mt-4 w-8 m-auto" v-if="isErrorVisible">{{ ErrorMsg }}</p>
                    <FormKit type="form" :actions="false" v-model="userInfo.userDetails" @submit="submitProfileInfo">
                        <div class="mt-3">
                            <div class="flex align-items-center justify-content-center">
                                <label for="Address" class="px-1 fontt">Shipping Address</label>
                            </div>
                            <FormKit id="Address" type="textarea" label="Shipping Address" placeholder="Enter your accurate shipping address" name="address" validation="required|length:10" />
                        </div>
                        <div class="mt-3">
                            <div class="flex align-items-center justify-content-center">
                                <label for="city" class="px-1 fontt">City</label>
                            </div>
                            <FormKit id="city" type="text" label="City" placeholder="Enter your city" name="city" validation="required" />
                        </div>
                        <div class="mt-3">
                            <div class="flex align-items-center justify-content-center">
                                <label for="state" class="px-1 fontt">State</label>
                            </div>
                            <FormKit id="state" type="select" label="State" :options="stateOptions" placeholder="Choose your state" name="state" validation="required" />
                        </div>
                        <div class="mt-3">
                            <div class="flex align-items-center justify-content-center">
                                <label for="zip" class="px-1 fontt">Zip Code</label>
                            </div>
                            <FormKit id="zip" type="text" label="City" placeholder="Enter your zip code" name="zip_code" validation="required|length:5:6" />
                        </div>
                        <div class="mt-3">
                            <div class="flex align-items-center justify-content-center">
                                <label for="phone" class="px-1 fontt">Phone Number</label>
                            </div>
                            <FormKit id="phone" type="text" label="Phone number" placeholder="Enter your Phone number" name="phone" validation="required" />
                        </div>
                        <div class="mt-3">
                            <div class="flex align-items-center justify-content-center">
                                <label for="location" class="px-1 fontt">Location Link <span class="mx-1 text-sm">(Optional)</span></label>
                            </div>
                            <FormKit id="location" type="text" label="Location Link" placeholder="Enter your Location link" name="location_link" validation="" />
                        </div>
                        <div class="mt-3">
                            <div class="flex align-items-center justify-content-center">
                                <label for="gender" class="px-1 fontt">Gender <span class="mx-1 text-sm">(Optional)</span></label>
                            </div>
                            <FormKit id="gender" type="select" label="Gender" :options="genderOptions" placeholder="choose your gender" name="gender" validation="" />
                        </div>
    
                        <!-- <button type="submit" class="submitBtn">Login</button> -->
                        <Button type="submit" class="submitBtn mt-5" label="Submit" :loading="loading" />
                        <h5 v-if="userUpdatedSuccessfully" class="fadein animation-duration-500 animation-iteration-1 p-3 px-4 text-white text-center" style="background-color: #00b457;">Your Details Updated successfully</h5>
                    </FormKit>
                    <h4 @click="logout();scrollToTop()" class="width80 p-3 w-5 cursor-pointer px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4">Logout</h4>
                    <h4 @click="push('/products');scrollToTop()" class="width80 p-3 w-5 cursor-pointer px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4">Shop Now</h4>
                </div>
            </div>
            <div v-if="OptionsValue == 'Reset Password'">
                <p class="text-center GrotesqueFont">Reset your password from here</p>
                <div class="py-4" style="background: url('https://github.com/KareemWebDeveloper/LifeFormulaImages/blob/main/Images/bggGredient2.jpg?raw=true') fixed ; background-size: cover; background-color: rgba(255, 255, 255, 0.911); background-blend-mode: multiply; border-radius: 10px;">
                    <p class="formkit-message text-center my-2 mt-4 w-8 m-auto" v-if="isResetPwErrorVisible">{{ ResetPwErrorMsg }}</p>
                    <FormKit type="form" :actions="false" @submit="resetPw">
                        <div class="mt-3">
                            <div class="flex justify-content-center align-items-center">
                                <span class="material-symbols-outlined text-3xl">vpn_key</span>
                                <label for="pw" class="px-1 fontt">Current Password</label>
                            </div>
                            <FormKit type="password" id="pw" label="Current Password" placeholder="Enter your current password" name="current_password" validation="required|length:8|alphanumeric" />
                        </div>
                        <div class="mt-3">
                            <div class="flex justify-content-center align-items-center">
                                <span class="material-symbols-outlined text-3xl">vpn_key</span>
                                <label for="newPw" class="px-1 fontt">New Password</label>
                            </div>
                            <FormKit type="password" id="newPw" label="New Password" placeholder="Enter your new password" name="new_password" validation="required|length:8|alphanumeric" />
                        </div>
                        <div class="mt-3">
                            <div class="flex justify-content-center align-items-center">
                                <span class="material-symbols-outlined text-3xl">vpn_key</span>
                                <label for="pw2" class="px-1 fontt">Confirm Password</label>
                            </div>
                            <FormKit type="password" id="pw2" label="Confirm Password" placeholder="Re-Enter your password" name="new_password_confirm" validation="required|confirm" />
                        </div>
                        <Button type="submit" class="submitBtn" label="Reset Password" :loading="loading" />
                        <h5 v-if="userUpdatedSuccessfully" class="fadein animation-duration-500 animation-iteration-1 p-3 px-4 text-white text-center" style="background-color: #00b457;">Password Changed Successfully</h5>
                    </FormKit>
                </div>
            </div>
            <div v-if="OptionsValue == 'Your Orders'">
                <p class="text-center GrotesqueFont">You have no orders yet !</p>
            </div>
        </div>
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Artifika&family=Bricolage+Grotesque:opsz@10..48&family=Secular+One&display=swap');
.GrotesqueFont{
    font-family: 'Bricolage Grotesque', sans-serif !important;
}
.formkit-input{
    text-align: center;
    font-family: 'Bricolage Grotesque', sans-serif !important;
    padding: 1.8vh;
    margin: auto;
    border: none;
    border-radius: 3px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.686);
    font-size: 15px;
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
    width: 60%;
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
@media screen and (max-width : 600px ){
    .widthFull{
        width: 100% !important;
    }
    .width80{
        width: 80% !important;
    }
    .formkit-form{
        margin: 2vh auto;
        width: 95% !important;
    }
    .padding0{
        padding: 1vh !important;
    }
    .userProfile .p-button{
        padding: 1.5vh 1.2vh;
        font-size: 14px;
    }
    .padding10{
        padding: 10vh 0 !important;
    }
}
</style>