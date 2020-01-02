const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'nicole',
  host: "localhost",
  database: "qanda",
  password: "password",
  port: "5432",
  max: 10
});

var dbQuery = (params) => {
  return new Promise ((resolve, reject) => {
    pool.query(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
}

module.exports = dbQuery;

