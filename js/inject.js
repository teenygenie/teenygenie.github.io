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

   
const picker = 
[{% for product in site.data.products[site.env] %}
{
  'id' : {{product.id | jsonify}},
  'colours' : [{% assign colours = product.skus | map: "colour" | uniq %}{% for colour in colours %}{% assign colourSkus = product.skus | where : 'colour', colour %}
    { 
      'colour' : {{colour | jsonify}}
      'sizes' : [{% for colourSku in colourSkus %}
        { 
          'size' : {{colourSku.size | jsonify }},
          'id' : {{colourSku.id | jsonify }}
        },{% endfor %}
      ],
    },{% endfor %}
  ],
},{% endfor %}
]

