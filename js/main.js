---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');

Vue.component('shop-front', {
  delimiters: ['((', '))'],
  props: ['products'],
  template: `
    <div class = "container">
    ((products))
    </div>
  `
})



var app = new Vue({
  el: '#app',
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
