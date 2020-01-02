var dbQuery = require('../db/index.js')

module.exports = {

  get: (product_id, records, toController) => { 
    const params = {
      text: `SELECT *  
        FROM (SELECT * FROM data.questions WHERE product_id = $1 AND data.questions.reported = 0 LIMIT $2 OFFSET $3) q
        LEFT JOIN (SELECT answer_id, question_id AS questionId_fromAnswers, body AS a_body, date AS a_date, answerer_name, reported AS a_reported, helpful AS a_helpful FROM data.answers WHERE reported = 0) a
        ON (q.question_id = a.questionId_fromAnswers)
        LEFT JOIN (SELECT answer_id AS answerId_fromPhotos, id AS photo_id, url FROM data.photos) p
        ON (a.answer_id = p.answerId_fromPhotos)`,
      values: [product_id, records.limit, records.offset],
    }
    dbQuery(params)
    .then (tables => { 
      // get questions
      let questions = {};
      for (table of tables) {
        let currQ = table.question_id;
        if (questions[currQ] === undefined) {
          questions[currQ] = {
            question_id: currQ,
            question_body: table.question_body,
            question_date: table.question_date + 'T00:00:00.000Z',
            asker_name: table.asker_name,
            reported: table.reported,
            question_helpfulness: table.helpful,
          }
          // get answers for currQ
          let answers = {};
          tables.forEach(table => {
            if (table.question_id === currQ) {
              if (answers[table.answer_id] === undefined) {
                answers[table.answer_id] = {
                  id: table.answer_id,
                  body: table.a_body,
                  date: table.a_date,
                  answerer_name: table.answerer_name,
                  helpfulness: table.a_helpful
                }
                answers[table.answer_id].photos = table.url === null ? [] : [table.url]
              } else {
                if (table.url !== null) {
                  answers[table.answer_id].photos.push(table.url)
                }
              }
            }
          });
          questions[currQ].answers = answers;
        }
      }
      let data = {
        product_id: product_id.toString(),
        results: Object.values(questions)
      }
      toController(null, data);
    });
  },

  post: (data, toController) => {
    let {body, name, email, product_id, date_written} = {...data};
    const params = {
      name: 'post-question',
      text: 'INSERT into data.questions(asker_name, asker_email, question_body, product_id, question_date) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [name, email, body, Number(product_id), date_written]
    }
    // console.log('Creating new question entry...')
    dbQuery(params).then(res => {
      // console.log('DONE');
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
    let deletionPromises = [];
    const delQuestionParams = {
      name: 'delete-question',
      text: 'DELETE FROM data.questions WHERE question_id = $1',
      values: [question_id]
    }
    const delAnswersParams = {
      name: 'delete-answers',
      text: 'DELETE FROM data.answers WHERE question_id = $1',
      values: [question_id]
    }
    deletionPromises.push(dbQuery(delQuestionParams));
    deletionPromises.push(dbQuery(delAnswersParams));
    const getAnsParams = {
      name: 'get-answers-ids',
      text: 'SELECT answer_id FROM data.answers where question_id = $1',
      values: [question_id]
    };
    dbQuery(getAnsParams).then(answer_ids => { // answer_ids to delete from photos
      answer_ids = answer_ids.map(item => item.answer_id)
      const delPhotosParams = {
        name: 'delete-photos',
        text: `DELETE FROM data.photos WHERE answer_id = ANY($1)`, // TO DO: fill in with answer_ids array
        values: [answer_ids]
      }
      deletionPromises.push(dbQuery(delPhotosParams));
      Promise.all(deletionPromises).then(() => {
        toController(null, 'deleted ')
      })
    })
  }
}