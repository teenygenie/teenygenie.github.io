---
---  
{% assign _products = "" | split: "" %}

const stripe = Stripe('{{site.stripe_key[site.env]}}');
const products = {{ site.data.products[site.env] | jsonify }};
const skus = {
{% for product in site.data.products[site.env] %}
  {% assign _products = _products | push: product.id %}
  {% for sku in product.skus %}
  {{sku.id}}:{
    product: '{{product.id}}',{% for item in sku %}
    {{item[0]}}:{{item[1] | jsonify}},{% endfor %}
  },{% endfor %}{% endfor %}
};
     {{_products | jsonify}}
const skuPicker = [];
{% for product in site.data.products[site.env] %}
skuPicker['{{product.id}}'] = [];{% for sku in product.skus %}
skuPicker['{{product.id}}']['{{sku.colour}}'] = skuPicker['{{product.id}}']['{{sku.colour}}'] || []
skuPicker['{{product.id}}']['{{sku.colour}}']['{{sku.size}}'] = '{{sku.id}}';{% endfor %}{% endfor %}
