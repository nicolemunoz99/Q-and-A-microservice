const { Pool, Client } = require('pg');
const client = new Client({
  user: 'nicole',
  host: "localhost",
  database: "qanda",
  password: "password",
  port: "5432"
});


client.connect(err => {
  if (err) {
    console.log('error: ', err.stack)
  } else { console.log('connected to SQL via Postgres')}
});


const query = (params, callback) => {
  
  return new Promise ((resolve, reject) => {
    client.query(params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    })
  })
}

module.exports = query;

