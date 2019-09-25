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
    <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <div class="nav-link dropdown-toggle" id="navbarCart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class = "fas fa-shopping-cart"></i>{{total | currency}}
            </div>
            <div class="dropdown-menu" aria-labelledby="navbarCart">
                <table>
                    <tbody>
                        <tr v-for = "item in cart">
                            <td>{{item.name}}</td>
                            <td>{{item.quantity}}&times;{{item.price | currency}}</td>
                            <td>{{item.price*item.quantity || currency}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
