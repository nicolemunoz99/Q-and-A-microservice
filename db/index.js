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

const query = {
  name: 'fetch-question',
  text: 'SELECT * FROM questions.table WHERE id = $1',
  values: [1],
}

client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})

async function questionQueries() {
  let selectSchemasSql = "SELECT schema_name FROM information_schema.schemata;";
}
