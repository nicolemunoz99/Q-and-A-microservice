const qModel = require('../model/question.js')
const aModel = require('../model/answer.js')

module.exports = {
  
  answer: {
    get: (req, res) => {
      let timerStart = Date.now();
      aModel.get(req.params.question_id, req.records, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.send(result);
          let timerStop = Date.now();
          console.log(`time (ms) to get a's for question ${req.params.question_id}: `, timerStop - timerStart)
        }
      });
    },
  
    post: (req, res) => {
      let timerStart = Date.now();
      let data = req.body;
      data.date_written = req.requestDate;
      data.question_id = req.params.question_id;
      aModel.post(data, (err, result) => {
        if (err) { 
          res.sendStatus(400);
        } else {
          let timerStop = Date.now();
          console.log(`time (ms) to post answer: `, timerStop - timerStart)
          res.sendStatus(201);
        }
      });
    },
  
    helpful: (req, res) => {
      let timerStart = Date.now();
      aModel.helpful(req.params.answer_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          let timerStop = Date.now();
          console.log(`time (ms) to mark answer as helpful: `, timerStop - timerStart)
          res.sendStatus(204);
        }
      });
    },
  
    report: (req, res) => {
      let timerStart = Date.now();
      aModel.report(req.params.answer_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          let timerStop = Date.now();
          console.log(`time (ms) to report answer: `, timerStop - timerStart)
          res.sendStatus(204);
        }
      }); 
    },

    delete: (req, res) => {
      let timerStart = Date.now();
      aModel.delete(req.params.answer_id, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          let timerStop = Date.now();
          console.log(`time (ms) to delete answer: `, timerStop - timerStart)
          res.sendStatus(204);
        }
      });
    }
  },


  question: {
    get: (req, res) => {
      let timerStart = Date.now();
      qModel.get(req.params.product_id, req.records, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          let timerStop = Date.now();
          console.log(`time(ms) to get q's for product ${req.params.product_id}: `, timerStop - timerStart)
          result = {
            product_id: req.params.product_id,
            results: result
          }
          res.send(result);
        }
      });   
    },
  
    post: (req, res) => {
      let timerStart = Date.now();
      let data = req.body
      data.product_id = req.params.product_id;
      data.date_written = req.requestDate;
      qModel.post(data, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          let timerStop = Date.now();
          console.log(`time(ms) to post q for product ${req.params.product_id}: `, timerStop - timerStart)
          res.sendStatus(201);
        }
      });
    },

    helpful: (req, res) => {
      let timer3Start = Date.now();
      console.log('req.params.question_id', req.params.question_id);
      qModel.helpful(req.params.question_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else { 
          let timer3Stop = Date.now();
          console.log(`time(ms) to mark q ${req.params.question_id} as helpful: `, timer3Stop - timer3Start)
          res.sendStatus(204);
        }
      });
    },
  
    report: (req, res) => {
      let timerStart = Date.now();
      qModel.report(req.params.question_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          let timerStop = Date.now();
          console.log('time (ms) to report question:', timerStop - timerStart);
          res.sendStatus(204);
        }
      });
    },

    delete: (req, res) => {
      let timerStart = Date.now();
      qModel.delete(req.params.question_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          let timerStop = Date.now();
          console.log('time (ms) to delete question: ', timerStop - timerStart);
          res.sendStatus(204);
        }
      });
    }
  
  }

}