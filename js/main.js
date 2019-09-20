var stripe = Stripe('{{site.stripe_key[site.env]}}');


Vue.component('store-cart-button',{
  props: ['total'],
  template: `
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <i class = "fas fa-cart"></i>{{total}}
      </button>
  `
})

Vue.component('store-front', {
  props: ['products'],
  template: `
  <div class="container">
    <div class="row">
        <div v-for = "product in products" class = "col-sm-12 col-md-6 card">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">{{product.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

Vue.component('store-cart-contents',{
  props: ['cart'],
  template: `
    <div class="col-sm-2 text-center">
    {{cart}}
    </div>
  `
})


var app = new Vue({
  el: '#app',
  data: {
    cart: [],
    products: {{ site.data.products[site.env] | jsonify  }}
  },
  computed: {
     total: function(){
      if (cart.length == 0) return 0
      return cart.reduce((total,item)=>(total+item.price),0)
     }
  },
  mounted(){
  }
})
