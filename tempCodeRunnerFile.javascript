use('StoreManager');
db.sales.updateOne(
  {
    _id : ObjectId("613f4535b09a2954d93e7fb6"),
  },
  {
    $set: {
      "itensSold.$[element].quantity": 5,
    },
  },
  {
    arrayFilters: [ { "element.productId ": "product_id" } ]
  },
);

// db.sales.find({})
