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
