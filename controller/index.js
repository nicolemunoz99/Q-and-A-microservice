const qModel = require('../model/question.js')
const aModel = require('../model/answer.js')

module.exports = {
  question: {
    get: (req, res) => {
      let timer1Start = Date.now();
      qModel.get(req.params.product_id, (err, result) => {
        let timer1Stop = Date.now();
        // console.log(`time(ms) to get q's for product ${req.params.product_id}: `, timer1Stop - timer1Start)
        res.send(result)
      })
      
    },
  
    post: (req, res) => {
      let data = req.body
      data.product_id = req.params.product_id;
      data.date_written = req.requestDate
      qModel.post(data, (err, result) => {
        res.send(result);
      })
    },
    helpful: (req, res) => {
      let timer3Start = Date.now();
      console.log('req.params.question_id', req.params.question_id)
      qModel.helpful(req.params.question_id, (err, result) => {
        let timer3Stop = Date.now();
        console.log(`time(ms) to mark q ${req.params.question_id} as helpful: `, timer3Stop - timer3Start)
        res.send(result)
      })
    },
  
    report: (req, res) => {
      console.log('hi')
      let timer2Start = Date.now();
      qModel.report(req.params.question_id, (err, result) => {
        let timer2Stop = Date.now();
        console.log(timer2Stop - timer2Start);
        res.send(result);
      })
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