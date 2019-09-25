Vue.filter('currency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    });
    return formatter.format(value);
});

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

Vue.component('store-cart',{
  props: ['cart','total'],
  template: `
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
          <i class = "fas fa-shopping-cart"></i>{{total|currency}}
           </a>
          <ul class="dropdown-menu dropdown-cart" role="menu">
              <li v-for = "item in cart">
                  <span class="item">
                    <span class="item-left">
                        <img src="http://lorempixel.com/50/50/" alt="" />
                        <span class="item-info">
                            <span>{{item.name}}</span>
                            <span>{{item.quantity}}</span>
                            <span>{{item.price || currency}}</span>
                        </span>
                    </span>
                    <span class="item-right">
                        <button class="btn btn-xs btn-danger pull-right">x</button>
                    </span>
                </span>
              </li>
              <li class="divider"></li>
              <li><a class="text-center" href="">Checkout</a></li>
          </ul>
        </li>
      </ul>
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
       return Object.values(this.cart).reduce((t, {price, quantity}) => t + price *  quantity, 0)
     }
  },
  mounted(){
  }
})
