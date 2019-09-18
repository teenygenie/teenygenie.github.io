---
---

var app = new Vue({
  el: '#app',
  data: {
    cart: []
  },
  mounted(){
    stripe.products.list(
      {limit: 100},
      function(err, products) {
        if(err) console.err(`There are no products available ${err}`)
        else {
          this.cart.push(...products)
        }
      }
    );
  }
})
