const query = require('../db/index.js');

module.exports = {
  get: (product_id, toController) => {
    const params = {
      name: 'query',
      text: `SELECT * FROM data.answers WHERE id = $1`,
      values: [product_id],
    }
    query(params, (err, res) => {
      toController(res)
    })
  },

  post: (question_id, toController) => {

  },

  helpful: (answer_id, toController) => {

  },

  report: (answer_id, toController) => {

  }
}