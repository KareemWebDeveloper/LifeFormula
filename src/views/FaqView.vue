<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ScrollPanel from 'primevue/scrollpanel';
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>
<template>
        <div class="w-full marginTop" style="background-color: #f2f4f7bc;">
            <!-- FAQ HEADER -->
            <h3 class="flex align-items-center justify-content-center bluePrimary text-center fontSizeMob" ><span class="material-symbols-outlined text-4xl lg:text-6xl">contact_support</span> FREQUENTLY ASKED QUESTIONS</h3>
            <h1 class="flex justify-content-center text-center" style="letter-spacing: 4px;">You've Got Any Questions?</h1>
            <p class="text:justify lg:text-center w-11 lg:w-8 m-auto my-3 mb-4 textJustifyMob">
              At Life Formula, we encourage our customers to take control of their health and well-being by providing them with the information and resources they need to make informed decisions about their vitamin and supplement intake</p>
            <!-- FAQ CONTENT -->
            <div class="w-full flex lg:flex-row sm:flex-column md:flex-column justify-content-center px-3 align-items-center FAQ">
            <div style="width: 45%;" class="flex align-items-center md:w-7 sm:w-8 faqImg">
              <img src="../assets/vitaminsFaq.png" class="w-full" alt="faq">
            </div>
            <div style="width: 45%;" class="sm:w-full md:w-full accordion" id="FAQ">
              <Accordion :activeIndex="0">
                <AccordionTab>
                  <template #header>
                    <div class="text-center flex align-items-center">
                      <span class="material-symbols-outlined mx-2 text-3xl">
                        prescriptions
                        </span>
                      <span>Do I need to take vitamins and supplements if I eat a healthy diet?</span>
                    </div>
                </template>
                  <ScrollPanel style="width: 100%; height: 200px">
                    <p>
                      Supplements can help you fill in the gaps in your diet and get the nutrients you need to
                      stay healthy. They can also help you improve your mood, sleep, and overall well-being.
                      There are many different types of supplements available, so you can choose the ones
                      that are right for you.<br><br>
                      Here are some of the benefits of taking supplements:
                    </p>
                      <ul class="my-2">
                        <li class="my-2"><span class="font-bold">Improved energy levels</span> : Supplements can help you feel more energetic
                          throughout the day.</li>
                        <li class="my-2"><span class="font-bold">Better focus and concentration</span> : Supplements can help you improve your focus
                          and concentration, which can be helpful for students, professionals, and anyone
                          who needs to be mentally sharp</li>
                        <li class="my-2"><span class="font-bold">Clarity of mind</span> : Supplements can help improve your clarity of mind and reduce
                          brain fog.</li>
                        <li class="my-2"><span class="font-bold">Boosted immune system</span> : Supplements can help boost your immune system and
                          protect you from disease.</li>
                        <li class="my-2"><span class="font-bold">Improved mood</span> : Supplements can help improve your mood and reduce stress
                          and anxiety.</li>
                        <li class="my-2"><span class="font-bold">Better Sleep</span> : Supplements can help you get a better night's sleep, which can
                          improve your overall health and well-being.</li>
                      </ul>
                    </ScrollPanel>
                  </AccordionTab>
                  <AccordionTab>
                    <template #header>
                      <div class="text-center flex align-items-center">
                        <span class="material-symbols-outlined mx-2 text-3xl">
                          medication_liquid
                          </span>
                        <span>How do I know which vitamins and supplements are right for me?</span>
                      </div>
                  </template>
                    <p>
                      Here are some factors to consider when choosing vitamins and supplements:
                    </p>
                    <ol class="p-2 px-4">
                      <li>Your age, sex, and lifestyle</li>
                      <li>Your overall health</li>
                      <li>Any medical conditions you have</li>
                      <li>Your diet</li>
                      <li>Your budget</li>
                    </ol>
                    <p>It is also important to choose vitamins and supplements that are high quality and made
                    from reputable brands.</p>
                  </AccordionTab>
                  <AccordionTab>
                    <template #header>
                      <div class="text-center flex align-items-center">
                        <span class="material-symbols-outlined mx-2 text-3xl">
                          pill
                          </span>
                        <span>How much should I take?</span>
                      </div>
                  </template>
                    <p>
                      The dosage of vitamins and supplements will vary depending on the individual. It is
                      important to follow the directions on the label carefully. Do not take more than the
                      recommended dosage.
                      </p>
                    </AccordionTab>
                  <AccordionTab>
                    <template #header>
                      <div class="text-center flex align-items-center">
                        <span class="material-symbols-outlined mx-2 text-3xl">
                          ecg_heart
                          </span>
                        <span>How long should I take vitamins and supplements?</span>
                      </div>
                  </template>
                    <p>
                      The length of time you take vitamins and supplements will depend on your individual
                      needs and goals. If you are taking vitamins and supplements to treat a specific health
                      condition, you may need to take them for a longer period of time.<br>
                      If you are taking vitamins and supplements to improve your overall health, you may only
                      need to take them for a short period of time. It is important to talk to your doctor to get
                      their recommendations on how long you should take vitamins and supplements.
                      </p>
                    </AccordionTab>
                  <AccordionTab>
                    <template #header>
                      <div class="text-center flex align-items-center">
                        <span class="material-symbols-outlined mx-2 text-3xl">
                          blood_pressure
                          </span>
                        <span>What are the side effects of vitamins and supplements?</span>
                      </div>
                  </template>
                    <p>
                      Most vitamins and supplements are safe when taken in the recommended dosage. It is
                      important to remember that vitamins and supplements are not a substitute for a healthy
                      diet and regular exercise. However, they can be a helpful way to improve your overall
                      health and well-being.
                      </p>
                    </AccordionTab>
                </Accordion>
            </div>
              </div>
              <div class="w-full m-auto flex justify-content-center">
                <router-link to="/products"  @click="scrollToTop()" class="p-3 px-5 m-auto bg-black text-center no-underline text-white shopNowHover my-4">SHOP NOW</router-link>
              </div>
    </div>
</template>
<style>
.marginTop{
  padding-top: 20vh;
}
.p-accordion-header-link{
  text-decoration: none !important;
}
@media screen and (max-width : 500px) {
  .marginTop{
    padding-top: 12vh !important;
  } 
}
</style>