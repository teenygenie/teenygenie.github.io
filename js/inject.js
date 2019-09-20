---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');
var products = {{ site.data.products[site.env] | jsonify }};
