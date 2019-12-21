const query = require('../db/index.js')

module.exports = {

  get: (product_id, toController) => {
    console.log('product id in model' , product_id);
    
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
      console.log('getting questions with answers ....')
      Promise.all(promises).then(result => {
        toController(null, result);
      })
    })
    // toController(null, 'some result')
  }

  
}