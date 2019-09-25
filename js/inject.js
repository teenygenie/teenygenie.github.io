---
---
var stripe = Stripe('{{site.stripe_key[site.env]}}');
var products = {{ site.data.products[site.env] | jsonify }};
var skus = {
  {% for product in site.data.products[site.env] %}
    {% for sku in product.skus %}
    '{{sku.id}}':{
          product: {{product.id}},
      {% for item in sku %}
        '{{item[0]}}':{{item[1] | jsonify}},
      {% endfor %}
    }
    {% endfor %}
  {% endfor %}
}
