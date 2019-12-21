const query = require('../db/index.js')

module.exports = {

  get: (product_id, toController) => { // done
    const params = {
      text: `SELECT * FROM data.questions WHERE product_id = $1`,
      values: [product_id],
    }
    query(params)
    .then (questions => {
      let promises = [];
      questions.forEach(q => {
        let answerParams = {
          text: `SELECT * FROM data.answers WHERE question_id = $1`,
          values: [q.id],
        }
        const fn = () => {
          return new Promise((resolve, reject) => {
            query(answerParams).then (answers => {
              q.answers = answers;
              resolve(q);
            })
          });
        };
        promises.push(fn());
      })
      console.log('Getting questions with answers ....')
      Promise.all(promises).then(result => {
        console.log('DONE')
        toController(null, result);
      })
    });
  },

  post: (data, toController) => { // done
    console.log('Creating new question entry...')
    let {body, name, email, product_id, date_written} = {...data};
    const params = {
      text: 'INSERT into data.questions(asker_name, asker_email, body, product_id, date_written) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [name, email, body, Number(product_id), date_written]
    }
    query(params).then(res => {
      console.log('DONE')
      toController(null, res)
    })
  },
  
  helpful: (question_id, toController) => { // done
    const params = {
      text: 'UPDATE data.questions SET helpful = helpful+1 WHERE id = $1',
      values: [question_id]
    }
    query(params).then(res => {
      toController(null, res)
    });
  },

  report: (question_id, toController) => { // done
    const params = {
      text: 'UPDATE data.questions SET reported = 1 WHERE id = $1',
      values: [question_id]
    }
    query(params).then(res => {
      toController(null, res);
    });
  }
}