var Data = require('../db/nosqlDb/index_nosql.js').Data;
// var db = require('../db/nosqlDb/index_nosql.js');

module.exports = {
  get: (product_id, records, toController) => {
    Data.
      findOne().
      where('_id').equals(product_id).
      exec((err, data) => {
        if (data === null) {
          let result = {
            product_id: product_id.toString(),
            results: []
          }
          toController(null, result)
        } else {
          let result = JSON.parse(JSON.stringify(data));
          let questions = result.results;
          let min = records.offset
          let max = min + records.limit
          questions = questions.slice(min, max);

          for (let i = 0; i < questions.length; i++) {
            let q = questions[i]
            delete q['_id'];
            delete q['asker_email']
            renameKey(q, 'id', 'question_id');
            renameKey(q, 'helpful', 'question_helpfulness');
            renameKey(q, 'date_written', 'question_date')
            renameKey(q, 'body', 'question_body')
            q.question_date = q.question_date + 'T00:00:00.000Z';
            let answers = {};
            q.answers.forEach(a => {
              delete a.answerer_email;
              delete a['_id'];
              delete a.question_id;
              renameKey(a, 'helpful', 'helpfulness');
              renameKey(a, 'date_written', 'date');
              a.date = a.date + 'T00:00:00.000Z';
              let photos = []
              a.photos.forEach(photo => {
                photos.push(photo.url)
              })
              
              a.photos = photos
              answers[a.id] = a;
              
            })
            q.answers = answers
          }
          renameKey(result, '_id', 'product_id')
          toController(null, result)
        }
        
      })

  }
  // ,

  // post: (data, toController) => {
  //   console.log('data', data)

  //   Data.findOne({'_id': Number(data.product_id)}, (err, doc) => {
  //     let newQuestion = new db.Question({
  //       product_id: data.product_id,
  //       body: data.body,
  //       date_written: data.date_written,
  //       asker_name: data.name,
  //       asker_email: data.email
  //     })
  //     console.log('doc', newQuestion)
  //   })

  //   toController(null, null)
  // }
}

const renameKey = (obj, origKey, newKey) => {
  obj[newKey] = obj[origKey];
  delete obj[origKey]
}