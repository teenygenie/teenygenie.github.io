---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');

Vue.component('store-front', {
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

Vue.component('store-cart',{
  delimiters: ['((', '))'],
  props: ['cart'],
  template: `
    <div class="col-sm-2 text-center">
      ((cart))
    </div>
  `
})


var app = new Vue({
  el: '#app',
  data: {
    cart: [],
    products: [
      {% for product in site.data.products[site.env] %}
      {{product}}
      {% endfor %}
    ]
  },
  mounted(){
  }
})
