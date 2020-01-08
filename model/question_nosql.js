var Data = require('../db/nosqlDb/index_nosql.js');

module.exports = {
  get: (product_id, records, toController) => {
    Data.
      findOne().
      where('_id').equals(product_id).
      exec((err, data) => {
        console.log('data', data)
        toController(null, data)
      })

  }
}