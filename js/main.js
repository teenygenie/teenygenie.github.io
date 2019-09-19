---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');

var app = new Vue({
  el: '#app',
  data: {
    cart: [],
    products: [
      {% for product in site.data.products[site.env] %}
      {
        id : {{product.id}},
        name: {{product.Name}}
      }
      {% endfor %}
    ]
  },
  mounted(){
  }
})

Vue.component('shop-front', {
  props: ['products'],
})
