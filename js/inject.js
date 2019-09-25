---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');
var products = {{ site.data.products[site.env] | jsonify }};
var skus = {
  {% for product in site.data.products[site.env] %}
  {% for sku in product.skus %}
  {% assign out = sku %}
    {{ out | jsonify }}
  {% endfor %}
  {% endfor %}
}
