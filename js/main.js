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
          <imgclass="card-img-top">
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
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li v-for="item in cart" class="nav-item">
          <a class="nav-link" href="#">{{item}}</a>
        </li>
      </ul>
    </div>
  `
})


var app = new Vue({
  el: '#app',
  data: {
    cart: [],
    products: products
  },
  computed: {
     total: function(){
      if (this.cart.length == 0) return 0
      return this.cart.reduce((total,item)=>(total+item.price),0)
     }
  },
  mounted(){
  }
})
