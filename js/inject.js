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
const skuRoots = [];
{% for product in site.data.products[site.env] %}
{% assign rooted = false %}
skuPicker[{{product.id | jsonify}}] = {}
{% assign colours = product.skus | map: "colour" | uniq %}
{% assign sizes = product.skus | map: "size" | uniq %}
{% for colour in colours %}
skuPicker[{{product.id | jsonify}}][{{colour | jsonify }}] = {}
{% for size in sizes %}
{% for sku in product.skus %}
{% if sku.colour == colour and sku.size == size %}
skuPicker[{{product.id | jsonify}}][{{colour | jsonify}}][{{size | jsonify}}] = {{sku.id | jsonify}}
{% if rooted == false %}
skuRoots[{{product.id | jsonify}}]= {colour: {{colour | jsonify}}, size: {{size | jsonify}}}
{% assign rooted = true %}
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}
{% endfor %}
{% endfor %}

