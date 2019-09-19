---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');

Vue.component('store-front', {
  delimiters: ['((', '))'],
  props: ['products'],
  template: `
  <div class="container">
    <div class="row">
        <div v-for = "product in products" class = "col-sm-12 col-md-6 card">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">((product.name))</p>
          </div>
        </div>
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
    products: {{ site.data.products[site.env] | jsonify  }}
  },
  mounted(){
  }
})
