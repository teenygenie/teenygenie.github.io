---
---

var app = new Vue({
  el: '#app',
  data: {
    apikey: {{site.stripe_key[site.env]}}
    cart: []
  },
  mounted(){
    Stripe.products.retrieve(
      'prod_FpiqPLvBFP7mbj',
      function(err, product) {
        // asynchronously called
      }
    );
  }
})
