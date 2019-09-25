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

Vue.component('store-checkout',{
    props: ['cart'],
    methods : {
        checkout : function(){
            this.$root.checkout()
        }
    }
    template: `
        <div>
            <table>
                <tbody>
                    <tr v-for = "item in cart">
                        <td>{{item.name}}</td><td>{{item.quantity}}</td><td>{{item.price | currency}}</td><td>{{item.price * item.quantity | currency}}</td>
                    </tr>
                </tbody>
            </table>
            <div class = "btn" :click="checkout">Buy</div>
        </div>
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

Vue.component('store-cart',{
  props: ['total'],
  template: `
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item"">
              <a :href = "total>0 ? '#checkout' : '#'" class = "btn" :class="{'btn-success': total>0}">
                <i class = "fas fa-shopping-cart"></i> {{total|currency}}
                <small v-if = "total>0">Checkout</small>
            </a>
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
    },
    checkout: function(){
        stripe.redirectToCheckout({
            items: [Object.values(this.cart).map((item)=>({item:item.id, quantity:item.quantity}))],
            successUrl: 'https://teeny-genie.com/success',
            cancelUrl: 'https://teeny-genie.com/canceled',
        })
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
