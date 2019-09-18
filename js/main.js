---
---
var stripe = Stripe({{site.stripe_key[site.env]}});

var app = new Vue({
  el: '#app',
  data: {
    cart: []
    products: []
  },
  mounted(){
    stripe.products.list(
      {limit: 100},
      function(err, products) {
        if(err) console.err(`There are no products available ${err}`)
        else {
          this.products.push(...products)
        }
      }
    );
  }
})

Vue.component('shop-front', {
  props: ['products'],
})
