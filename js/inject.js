---
---
const stripe = Stripe('{{site.stripe_key[site.env]}}');
const products = {{ site.data.products[site.env] | jsonify }};
const skus = {
{% for product in site.data.products[site.env] %}{% for sku in product.skus %}
  {{sku.id}}:{
    product: '{{product.id}}',{% for item in sku %}
    {{item[0]}}:{{item[1] | jsonify}},{% endfor %}
  },{% endfor %}{% endfor %}
};

   
const skuPicker = {};
{% for product in site.data.products[site.env] %}
skuPicker[{{product.id | jsonify}}] = []
{% assign colours = product.skus | map: "colour" %}
{% assign sizes = product.skus | map: "size" %}
{% for colour in colours %}
{% assign cIndex = forloop.index0 %}
{{colour}}{{cIndex}}
skuPicker[{{product.id | jsonify}}][{{cIndex}}] = []
{% for size in sizes %}
{% assign sIndex = forloop.index0 %}
{% for sku in product.skus %}
{% if sku.colour == colour && sku.size == size }}
skuPicker[{{product.id | jsonify}}][{{cIndex}}][{{sIndex}}] = sku.id
{% endif %}
{% endfor %}
{% endfor %}
{% endfor %}
{% endfor %}
