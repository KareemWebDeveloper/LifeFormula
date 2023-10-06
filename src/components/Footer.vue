<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
const reload = () => {
setTimeout(() => {
      location.reload()
  }, 300);
}

const contactUs = () => {
    let contactButton = document.getElementById('contactUsButton');
    contactButton!.click();
}

</script>
<template>
    <footer>
      <div class="Upp">
        <div class="shops">
            <h4>Products</h4>
            <RouterLink to="/products" @click="scrollToTop" class="links">All Products</RouterLink>
            <!-- <RouterLink to="/products" class="links">Supplements</RouterLink> -->
            <RouterLink to="/products" @click="scrollToTop" class="links">Shop by Category</RouterLink>
            <RouterLink :to="{ name: 'home', hash: '#Featured' }" @click="scrollToTop" class="links">Best Selling</RouterLink>
        </div> 
        <div class="shops">
            <h4>INFORMATION</h4>
            <RouterLink to="/about" @click="scrollToTop" class="links">About Us</RouterLink>
            <!-- <RouterLink to="" class="links">FAQ</RouterLink> -->
            <RouterLink to="/privacy-policy"  @click="scrollToTop" class="links">privacy policy</RouterLink>
            <RouterLink :to="{ name: 'termsConditions', hash: '#terms' }" @click="scrollToTop" class="links">Terms & condition</RouterLink>
        </div> 
        <div class="shops">
            <h4>CUSTOMER SERVICE</h4>
            <!-- <RouterLink to="" class="links">Search Terms</RouterLink> -->
            <RouterLink to="/Shipping-policies" @click="scrollToTop" class="links">Shipping policy</RouterLink>
            <RouterLink to="" class="links" @click="contactUs">Contact Us</RouterLink>
            <RouterLink to="/FAQ" @click="scrollToTop" class="links">Help & FAQs</RouterLink>
        </div> 
        <div class="newsletter my-3">
            <!-- <h4>Registration</h4> -->
            <img src="../assets/LifeFourmlaLogo.png" class="w-8 sm:m-auto md:m-auto" alt="">
            <!-- <div class="icons my-2">
                <i class="fa-brands fa-facebook icc mx-1"></i>
                <i class="fa-brands fa-twitter icc mx-1"></i>
                <i class="fa-brands fa-youtube icc mx-1"></i>
            </div> -->
        </div> 
    </div>
       <div class="outro">
        <p> 	&#169; 2023 Life Formula Online. All Rights Reserved.
        </p>
        <div class="icons2">
            <i class="fa-brands fa-cc-visa icc" style="margin: 0 0.7vh;"></i>
            <i class="fa-brands fa-cc-mastercard icc" style="margin: 0 0.7vh;"></i>
            <i class="fa-brands fa-cc-paypal icc" style="margin: 0 0.7vh;"></i>
        </div>
       </div>
    </footer>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
footer{
    background-color: #a8a8a870;
    font-family: 'Roboto', sans-serif;
}
.Upp{
    padding: 10vh;
    display: flex;
    width: 100%;
}
.shops{
    display: flex;
    flex-direction: column;
    margin-right: 3vh;
    width: 25%;
}
.newsletter{
    width: 30%;
    margin: auto;
    text-align: center;
}
.shops h4 , .newsletter h4{
    color: #00405a;
    font-weight: 600;
    margin-bottom: 3vh;
}
.links{
    width: 50%;
    color: #444444e2;
    text-decoration: none;
    margin: 0.2vh 0;
    transition-duration: 0.2s;
}
.links:hover{
    color: #00405a;
}
.newsletter form{
    display: flex;
    flex-direction: column;
}
.newsletter label{
    color: #a8a8a8;
    margin: 1vh 0;
}
.newsletter input{
    background-color: #a8a8a800;
    border: 1px solid white;
    margin: 1vh 0;
    padding: 0.3vh 2vh;
    color: white;
}
.subscribe{
    background-color: #e13ed7 !important;
    border: none !important;
    font-weight: 600;
    padding: 0.6vh 2vh !important;
    margin-top: 1vh;
}
.icons{
    display: flex;
    justify-content: center;
    color: #00405a;
    font-size: 26px;
    margin-top: 5vh;
    margin: 0 ;
}
.icc{
    color: #00405a;
    cursor: pointer;
    transition-duration: 0.2s;
}
.icc:hover{
    color: white;
}
.outro{
    padding: 1.5vh 0vh;
    background-color: #00405a;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.outro p{
    font-size: 13px;
    margin-bottom: 0;
    color: white;
    padding-left: 10vh;
}
.icons2{
    padding-right: 10vh;
    color: #a8a8a8;
    font-size: 24px;
}
@media screen and (max-width:1200px){
    *{
        margin: 0;
    }
    .Upp{
        padding: 0;
        display: flex;
        /*flex-direction: column;*/
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 3vh;
    }
    .shops{
        width: 25%;
        text-align: center;
        margin: auto;
        
    }
    .newsletter{
        width: 25%;
        margin: auto;
        text-align: center;
    }
    .shops h4 , .newsletter h4{
        color: white;
        font-weight: 600;
        margin: 2vh;
        text-align: center;
    }
    .links{
        width: 100%;
        text-align: center;
        margin: auto;
    }
    .newsletter label{
        color: #a8a8a8;
        margin: auto;
    }
    .newsletter h4{
        margin-top: 4vh;
    }
    .newsletter input{
        width: 70%;
        margin: 1vh auto;
        padding: 1vh 2vh;
        color: white;
    }
    .outro{
        display: flex;
        flex-direction: column;
        padding: 1.8vh 0;
    }
    .outro p{
        width: 90%;
        padding: 0vh;
        text-align: center;
        margin-bottom: 1vh;
    }
    .icons2{
        display: flex;
        justify-content: center;
        font-size: 24px;
        padding-right: 0;
        margin: auto;
    }
}
@media screen and (max-width:800px){
    *{
        margin: 0;
    }
    .Upp{
        padding: 0;
        display: flex;
        /*flex-direction: column;*/
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 3vh;
    }
    .shops{
        width: 50%;
        text-align: center;
        margin: auto;
        
    }
    .newsletter{
        width: 50%;
        margin: auto;
    }
    .shops h4 , .newsletter h4{
        color: white;
        font-weight: 600;
        margin: 2vh;
        text-align: center;
    }
    .links{
        width: 100%;
        text-align: center;
        margin: auto;
    }
    .newsletter label{
        color: #a8a8a8;
        margin: auto;
    }
    .newsletter h4{
        margin-top: 4vh;
    }
    .newsletter input{
        width: 70%;
        margin: 1vh auto;
        padding: 1vh 2vh;
        color: white;
    }
    .outro{
        display: flex;
        flex-direction: column;
        padding: 1.8vh 0;
    }
    .outro p{
        width: 90%;
        padding: 0vh;
        text-align: center;
        margin-bottom: 1vh;
    }
    .icons2{
        display: flex;
        justify-content: center;
        font-size: 24px;
        padding-right: 0;
        margin: auto;
    }
}

@media screen and (max-width:700px){
    *{
        margin: 0;
    }
    .Upp{
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 3vh;
    }
    .shops{
        width: 90%;
        text-align: center;
        margin: auto;
    }
    .shops h4 , .newsletter h4{
        color: white;
        font-weight: 600;
        margin: 2vh;
        text-align: center;
    }
    .links{
        width: 100%;
        text-align: center;
        margin: auto;
    }
    .newsletter label{
        color: #a8a8a8;
        margin: auto;
        text-align: center;
    }
    .newsletter h4{
        margin-top: 4vh;
    }
    .newsletter input{
        width: 85%;
        margin: 1vh auto;
        padding: 1vh 2vh;
        color: white;
        font-size: 13px;
        text-align: center;
    }
    .outro{
        display: flex;
        flex-direction: column;
        padding: 1.8vh 0;
    }
    .outro p{
        width: 90%;
        padding: 0vh;
        text-align: center;
        margin-bottom: 1vh;
    }
    .newsletter{
        margin: auto;
    }
    .icons2{
        display: flex;
        justify-content: center;
        font-size: 24px;
        padding-right: 0;
        margin: auto;
    }
}
</style>