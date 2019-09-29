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

Vue.component('store-sku-picker',{
    props:['id'],
    data: function(){
        return {
            skus: picker.find(product=>product.id==this.id),
            colourIndex: 0,
            sizeIndex: 0,
        }
    },
    template: `
        <div>    
            <div class="btn-group" role="group">
                <button v-for = "(colourOption, index) in skus.colours" type="button" :class="{active : colourIndex == index}" class="btn btn-secondary" @click="colourIndex = index">
                    {{colourOption.colour}}
                </button>
            </div>
            <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{skus.colours[colourIndex].sizes[sizeIndex].size}}
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <div v-for = "(sizeOption, index) in skus.colours[colourIndex].sizes" class="dropdown-item" @select="sizeIndex = index">
                        {{sizeOption.size}}
                    </div>
                </div>
            </div>
            <store-add-remove :id = "skus.colours[colourIndex].sizes[sizeIndex].id"></store-add-remove>
        </div>
    `,
})

Vue.component('store-checkout',{
    props: ['cart'],
    methods : {
        checkout : function(){
            this.$root.checkout()
        }
    },
    template: `
        <div class = "container" v-if = "Object.keys(cart).length > 0">
            <table class = "table">
                <tbody>
                    <tr v-for = "item in cart">
                        <td>{{item.name}} ({{item.colour}} {{item.size}})</td><td>{{item.quantity}}</td><td>{{item.price | currency}}</td><td>{{item.price * item.quantity | currency}}</td>
                    </tr>
                </tbody>
            </table>
            <div class = "btn btn-success" @click="checkout">Payment</div>
        </div>
    `
})

Vue.component('store-add-remove', {
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
        <div class = "btn btn-primary btn-small" @click="remove">&minus;</div>
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
      console.log("Add",id)
      if(this.cart[id]) this.cart[id].quantity++
      else Vue.set(this.cart,id,{...skus[id],quantity:1})
    },
    remove: function(id){
        console.log("Remove",id)
      if(this.cart[id]) this.cart[id].quantity == 1 ? Vue.delete(this.cart,id) : this.cart[id].quantity--
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
