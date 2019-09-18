---
---

var app = new Vue({
  el: '#app',
  data: {
    apikey: {{site.stripe_key[site.env]}}
    cart: []
  }
})
