var Data = require('../db/nosqlDb/index_nosql.js').Data;

module.exports = {
  get: (question_id, records, toController) => {
    console.log('records', records)
    Data.findOne({'results.id': question_id, 'results.reported': 0}).
      exec((err, data) => {
        let answers;
        let result = JSON.parse(JSON.stringify(data));
        result.results.forEach(q => {
          if (q.id === Number(question_id)) {
            answers = q.answers
          }
        });
        let min = records.offset
        let max = min + records.limit
        answers = answers.slice(min, max);
        console.log('max', max)
        for (let i = 0; i < answers.length; i++){
          if (answers[i] === undefined) { break }
          let a = answers[i];
          delete a['_id'];
          delete a.answerer_email;
          delete a.question_id;
          renameKey(a, 'id', 'answer_id');
          renameKey(a, 'date_written', 'date');
          renameKey(a, 'helpful', 'helpfulness');
          let photos = [];
          a.photos.forEach(photo => {
            photos.push(photo.url);
          })
          a.photos = photos;
          a.date = a.date + 'T00:00:00.000Z';
        }
        result = {
          question: question_id.toString(),
          count: records.limit,
          page: records.page,
          results: answers,
        }
        toController(null, result)
      })
  }
}




const renameKey = (obj, origKey, newKey) => {
  obj[newKey] = obj[origKey];
  delete obj[origKey]
}