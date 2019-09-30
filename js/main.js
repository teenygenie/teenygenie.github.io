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

Vue.component('store-product',{
    props:['id'],
    data: function(){
        let product = products.find(product=>product.id == this.id)
        return {
            product : product,
            img : product.skus[0].img
        }
    },
    methods: {
        changeImage: function(img){
            this.img = img
        }
    },
    template: `
        <div class = "card">
            <img class="card-img-top" :src="img" alt="Card image">
              <div class="card-body">
                <h4 class="card-title">{{product.name}}</h4>
                <p class="card-text">{{product.description}}</p>
                <store-sku-picker :id="id"></store-sku-picker>
              </div><!--body-->
        </div><!--card-->
    `
})



Vue.component('store-sku-picker',{
    props:['id'],
    data: function(){
        return {
            picker: picker.find(product=>product.id == this.id),
            colourIndex: 0,
            sizeIndex: 0,
        }
    },
    methods: {
        chooseColour : function(colourIndex){
            this.sizeIndex = Math.max(0,this.picker.colours[colourIndex].sizes.findIndex(sizeOption=>sizeOption.size==this.picker.colours[this.colourIndex].sizes[this.sizeIndex].size))
            this.colourIndex = colourIndex;
            this.$parent.changeImage(this.picker.colours[this.colourIndex].img);
        },
        chooseSize : function(sizeIndex){
            this.sizeIndex = sizeIndex
        }
    },
    template: `
        <div>    
            <div class="btn-group btn-group-sm" role="group">
                <button v-for = "(colourOption, index) in picker.colours" type="button" :class="colourIndex == index ? 'btn-info' : 'btn-outline-info'" class="btn" @click="chooseColour(index)">
                    {{colourOption.colour}}
                </button>
            </div>
            <br>
            <div class="btn-group btn-group-sm" role="group">
                <div v-for = "(sizeOption, index) in picker.colours[colourIndex].sizes" :class="sizeIndex == index ? 'btn-info' : 'btn-outline-info'" class="btn" @click="chooseSize(index)">
                    {{sizeOption.size}}
                </div>
            </div>
            <br>
            <store-add-remove :id = "picker.colours[colourIndex].sizes[sizeIndex].id"></store-add-remove>
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
