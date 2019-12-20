const model = require('../model')

module.exports = {
  question: {
    get: (req, res) => {
      model.question.get(req.params.product_id, (err, result) => {
        console.log('q get result in controller: ', result)
      })
      
    },
  
    post: (req, res) => {
  
    },
  
    helpful: (req, res) => {
  
    },
  
    report: (req, res) => {
  
    }
  },

  answer: {
    get: (req, res) => {
      console.log('question id of answers to get', req.params.question_id)
      
    },
  
    post: (req, res) => {
      console.log('id of question answered:', req.params.question_id)
    },
  
    helpful: (req, res) => {
      console.log('helpful answer id', req.params.answer_id)
    },
  
    report: (req, res) => {
      console.log('reported answer id', req.params.answer_id)
    }
  }


}