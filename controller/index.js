const qModel = require('../model/question.js')
const aModel = require('../model/answer.js')

module.exports = {
  question: {
    get: (req, res) => {
      let timer1Start = Date.now();
      qModel.get(req.params.product_id, (err, result) => {
        let timer1Stop = Date.now();
        console.log(`time(ms) to get q's for product ${req.params.product_id}: `, timer1Stop - timer1Start)
        res.send(result)
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