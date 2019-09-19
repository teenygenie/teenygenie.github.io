---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');

var app = new Vue({
  el: '#app',
  delimiters: ['{(', ')}'],
  data: {
    cart: [],
    products: [
      {% for product in site.data.products[site.env] %}
      {
        id : "{{product.id | escape }}",
        name: "{{product.Name | escape }}"
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
