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
    },
    template: `
        <div>
            <table>
                <tbody>
                    <tr v-for = "item in cart">
                        <td>{{item.name}}</td><td>{{item.quantity}}</td><td>{{item.price | currency}}</td><td>{{item.price * item.quantity | currency}}</td>
                    </tr>
                </tbody>
            </table>
            <div class = "btn" @click="checkout">Buy</div>
        </div>
    `
})

Vue.component('store-add', {
  props: ['id'],
  methods: {
    add: function(){
      this.$root.add(this.id)
    },
    remove: function(){
      this.$root.remove(this.id)
    }
  },
  template: `
    <div>
    <div class = "btn btn-primary btn-small" @click="add">&plus;</div>
    <div class = "btn btn-primary btn-small" @click="remove">&plus;</div>
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
    skus: skus
  },
  methods: {
    add: function(id){
      if(this.cart[id]) this.cart[id].quantity++
      else Vue.set(this.cart,id,{sku: this.skus[id],quantity:1})
    },
    remove: function(id){
      if(this.cart[id]) this.cart[id].quantity == 1 ? Vue.delete(this.cart[id]) : this.cart[id].quantity--
    },
    checkout: function(){
        stripe.redirectToCheckout({
            items: [...Object.values(this.cart).map((sku)=>({sku:sku.id, quantity:sku.quantity}))],
            successUrl: 'https://teeny-genie.com/success',
            cancelUrl: 'https://teeny-genie.com/canceled',
        })
    }
  },
  computed: {
     total: function(){
       return Object.values(this.cart)
      .reduce((t, {price, quantity}) => t + price *  quantity, 0)
     }
  },
  mounted(){
  }
})
