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
    add: function(sku){
      this.$root.add(sku)
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
    cart: {},
    products: products
  },
  methods: {
    add: function(sku){
      if(this.cart[sku.id]){
        this.cart[sku.id].quantity++
      } else {
        Vue.set(this.cart,sku.id,sku)
        Vue.set(this.cart[sku.id],'quantity',1)
      }
    }
  },
  computed: {
     total: function(){
       let theTotal = 0;
       Object.keys(this.cart).forEach((sku)=>{
         theTotal += sku.price * sku.quantity
       })
       return theTotal
     }
  },
  mounted(){
  }
})
