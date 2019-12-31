var dbQuery = require('../db/index.js')

module.exports = {

  get: (product_id, records, toController) => { 
    const params = {
      text: `SELECT *  
      FROM data.questions 
      LEFT JOIN data.answers ON (data.answers.question_id = data.questions.question_id)
      LEFT JOIN data.photos ON (data.photos.answer_id = data.answers.answer_id) WHERE product_id = $1`,
        // `SELECT *  
        // FROM (SELECT * FROM data.questions WHERE product_id = $1 AND data.questions.reported = 0 LIMIT $2 OFFSET $3) q
        // LEFT JOIN data.answers ON (data.answers.question_id = q.question_id)
        // LEFT JOIN data.photos ON (data.photos.answer_id = data.answers.answer_id)`,
        
      values: [product_id], //, records.limit, records.offset
    }
    dbQuery(params)
    .then (result => {
      toController(null, result)
    });
  },

  post: (data, toController) => {
    let {body, name, email, product_id, date_written} = {...data};
    const params = {
      name: 'post-question',
      text: 'INSERT into data.questions(asker_name, asker_email, question_body, product_id, question_date) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [name, email, body, Number(product_id), date_written]
    }
    console.log('Creating new question entry...')
    dbQuery(params).then(res => {
      console.log('DONE');
      toController(null, res);
    })
  },
  
  helpful: (question_id, toController) => {
    const params = {
      name: 'mark-question-helpful',
      text: 'UPDATE data.questions SET helpful = helpful+1 WHERE question_id = $1',
      values: [question_id]
    }
    dbQuery(params).then(res => {
      toController(null, res);
    });
  },

  report: (question_id, toController) => {
    const params = {
      name: 'reprt-question',
      text: 'UPDATE data.questions SET reported = 1 WHERE question_id = $1',
      values: [question_id]
    }
    dbQuery(params).then(res => {
      toController(null, res);
    });
  },

  delete: (question_id, toController) => {
    const params = {
      name: 'delete-question',
      text: 'DELETE FROM data.questions WHERE question_id = $1',
      values: [question_id]
    }
    dbQuery(params).then(res => {
      toController(null, res);
    });
  }
}