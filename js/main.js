---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');

Vue.component('shop-front', {
  delimiters: ['((', '))'],
  props: ['products'],
  template: `
    <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h3>Easier than rubbing a lamp!</h3>
                ((product))
          </div>
        </div>
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
