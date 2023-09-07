<template>
    <div>
      <button @click="openCheckout" class="px-4 py-2" style="margin-top: 50vh;">Pay with Stripe</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      async openCheckout() {
        const response = await axios.get('https://api-lifeformula.com/api/create-checkout-session');
        const sessionId = response.data.sessionId;
  
        const stripe = Stripe('pk_test_51NlVKQKQG7NeLaUweBLymb8qv7z753Rz3hQxPKU715o2N0GjxIaB8QfYyq9fSAS1I9lMko1TCh13DjGgSw342yMC00xdvFq5i3');
  
        stripe.redirectToCheckout({
          sessionId: sessionId,
        }).then(function (result) {
            console.log(result);
          if (result.error) {
            console.error(result.error.message);
        }
        else{
              console.error(result);
          }
        });
      },
    },
  };
  </script>