---
---
{% for product in site.data.products[site.env] %}
{{site.emptyArray}}
  {% assign _products[product.id] = site.emptyArray %}
  {{_products}}{{product.id}}
  {% for sku in product.skus %}
    {% if !_products[product.id][sku.colour] %}
      {% assign _products[product.id][sku.colour] = site.emptyArray %}
    {% endif %}
    {% if !_products[product.id][sku.colour][sku.size] %}
      {% assign _products[product.id][sku.colour][sku.size] = site.emptyArray %}
    {% endif %}
    {% assign _products[product.id][sku.colour][sku.size] = sku.id %}
  {% endfor %}
{% endfor %}
  

const stripe = Stripe('{{site.stripe_key[site.env]}}');
const products = {{ site.data.products[site.env] | jsonify }};
{%  assign _products = site.emptyArray %}
const skus = {
{% for product in site.data.products[site.env] %}{% for sku in product.skus %}
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
