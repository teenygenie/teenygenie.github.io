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
  methods: {
    add: function(product){
      this.$emit('add',product)
    }
  },
  template: `
  <div class="container">
    <div class="row">
        <div v-for = "product in products" class = "col-sm-12 col-md-6 card">
          <img class="card-img-top" src="https://via.placeholder.com/150" alt="Card image">
          <div class="card-body">
            <h4 class="card-title">{{product.name}}</h4>
            <p class="card-text">{{product.description}}</p>
            <button v-for = "sku in product.skus" class="btn btn-primary" v-on:click="add(sku)">{{sku.size}} {{sku.colour}}</button>
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
