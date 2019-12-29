var dbQuery = require('../db/index.js')

module.exports = {

  get: (product_id, records, toController) => {
    const params = {
      text: `SELECT * FROM data.questions WHERE product_id = $1 AND reported = 0 LIMIT $2 OFFSET $3`,
      values: [product_id, records.limit, records.offset],
    }
    dbQuery(params)
    .then (questions => {
      let promises = [];
      questions.forEach(q => {
        let answerParams = {
          text: `SELECT * FROM data.answers WHERE question_id = $1 AND reported = 0`,
          values: [q.question_id],
        }
        const fn = () => {
          return new Promise((resolve, reject) => {
            dbQuery(answerParams).then (answers => {
              q.answers = {};
              q.question_date = q.question_date + 'T00:00:00.000Z';
              q.question_helpfulness = q.helpful;
              delete q.helpful;
              delete q.asker_email;
              delete q.product_id;

              // promise function to get photos - resolves on answer
              let photoPromises = [];

              answers.forEach(a => {
                const getPhotos = () => {
                return new Promise((resolve, reject) => {   
                  // query photos table
                  let photoParams = {
                    text: `SELECT * FROM data.photos WHERE answer_id = $1`,
                    values: [a.answer_id], 
                  }
                  dbQuery(photoParams).then(photos => {
                    a.photos = photos.map(photo => photo.url)
                    a.id = a.answer_id;
                    a.helpfulness = a.helpful;
                    a.date = a.date + 'T00:00:00.000Z'
                    delete a.answer_id;
                    delete a.helpful;
                    delete a.answerer_email;
                    delete a.question_id;
                    resolve(a)
                  });
                });
                }
                photoPromises.push(getPhotos());
              });

              Promise.all(photoPromises).then(answersWithPhotos => {
                answersWithPhotos.forEach(a => {
                  q.answers[a.id] = a;
                });
                resolve(q);
              });

            });
          })
        };
        promises.push(fn());
      })
      console.log('Getting questions with answers ....')
      
      Promise.all(promises).then(result => {
        console.log('DONE');
        toController(null, result);
      })

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