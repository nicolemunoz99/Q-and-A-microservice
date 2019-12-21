const query = require('../db/index.js');

module.exports = {
  get: (answer_id, controller) => {
    const params = {
      name: 'query',
      text: `SELECT * FROM data.answers WHERE id = $1`,
      values: [answer_id],
    }
    query(params, (err, res) => {
      console.log(res)
    })
  }
}