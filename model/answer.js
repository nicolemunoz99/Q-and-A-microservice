var dbQuery = require('../db/index.js');

module.exports = {
  get: (question_id, records, toController) => {
    const params = {
      name: 'get-answers',
      text: `SELECT * 
      FROM (SELECT * FROM data.answers WHERE question_id = $1 AND reported = 0 LIMIT $2 OFFSET $3) a
      LEFT JOIN (SELECT answer_id AS answerId_fromPhotos, url FROM data.photos) p
      ON (a.answer_id = p.answerId_fromPhotos)`,
      values: [question_id, records.limit, records.offset],
    }
    dbQuery(params)
    .then(tables => {
      let answers = {};
      for (table of tables) {
        let currA = table.answer_id
        if (answers[currA] === undefined) {
          answers[currA] = {
            answer_id: table.answer_id,
            body: table.body,
            date: table.date + 'T00:00:00.000Z',
            answerer_name: table.answerer_name,
            helpfulness: table.helpful,
          };
          answers[currA].photos = table.url === null ? [] : [table.url];
        } else {
          if (table.url !== null) { answers[currA].photos.push(table.url) }
        }
      }
      let data = {
        question: question_id.toString(),
        page: records.page,
        count: records.limit,
        results: Object.values(answers)
      }
      toController(null, data);
    })
      
  
  },

  post: (data, toController) => {
    const params = {
      name: 'post-an-answer',
      text: `INSERT into data.answers(question_id, body, date, answerer_name, answerer_email) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      values: [data.question_id, data.body, data.date_written, data.name, data.email]
    }
    dbQuery(params).then((result) => {
      if (data.photos.length > 0 && data.photos[0] !== '') {
        let promises = [];
        data.photos.forEach(photo => {
          const postPhoto = () => {
            return new Promise ((resolve, reject) => {
              let photoParams = {
                name: 'post-photos',
                text: `INSERT into data.photos(answer_id, url) VALUES($1, $2) RETURNING *`,
                values: [result[0].answer_id, photo]
              }
              dbQuery(photoParams).then((result) => {
                resolve(result)
              })
            })
          }
          promises.push(postPhoto()); 
        });
        
        Promise.all(promises).then(postedPhotos => {
          toController(null, 'done creating entry');
        })
      }
      
    })
    .catch(err => { toController(err) })
  },

  helpful: (answer_id, toController) => {
    const params = {
      name: 'mark-answer-helpful',
      text: 'UPDATE data.answers SET helpful = helpful+1 WHERE answer_id = $1',
      values: [answer_id],
    }
    dbQuery(params).then(() => {
      toController(null, 'answer marked as helpful')
    })
    
  },

  report: (answer_id, toController) => {
    const params = {
      name: 'report-answer',
      text: 'UPDATE data.answers SET reported = 1 WHERE answer_id = $1',
      values: [answer_id],
    }
    dbQuery(params).then(() => {
      toController(null, 'answer marked as reported')
    })
    
  },

  delete: (answer_id, toController) => {
    let deletionPromises = [];
    const params = {
      name: 'delete-answer',
      text: 'DELETE FROM data.answers WHERE answer_id = $1',
      values: [answer_id],
    }
    deletionPromises.push(dbQuery(params));
    const getPhotosParams = {
      name: 'get-photo-ids',
      text: 'SELECT id from data.photos WHERE answer_id = $1',
      values: [answer_id],
    }
    dbQuery(getPhotosParams).then((photoIds) => {
      photoIds = photoIds.map(item => item.id)
      const deletePhotosParams = {
        name: 'delete-photos',
        text: `DELETE FROM data.photos WHERE id = ANY($1)`,
        values: [photoIds]
      }
      deletionPromises.push(dbQuery(deletePhotosParams));
      Promise.all(deletionPromises).then(() => {
        toController(null, 'deleted')
      })
    })
  }
}