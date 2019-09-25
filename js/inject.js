---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');
var products = {{ site.data.products[site.env] | jsonify }};
var skus = {
  {% for sku in site.data.products[site.env].skus %}
  {{sku | jsonify}},   
  {% endfor %}
}
