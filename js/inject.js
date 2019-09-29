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

   
const skuPicker = 
[
{% for product in site.data.products[site.env] %}
{
  'product' : {{product.id | jsonify}},
  'colours' : [
{% for sku in product.skus %}
    { 
      'colour' : {{sku.colour | jsonify}},
{% assign filteredSkus = product.skus | where : 'colour', sku.colour %}
      'sizes' : [
{% for filteredSku in filteredSkus %}
        { 
          'size' : {{filteredSku.size | jsonsify }},
          'sku' : {{filteredSku.id | jsonify }}
        },
{% endfor %}
      ],
    },
{% endfor %}
  ],
},
{% endfor %}
]

