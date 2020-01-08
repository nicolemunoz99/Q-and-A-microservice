// const qModel = require('../model/question.js')
// const aModel = require('../model/answer.js')

const qModel = require('../model/question_nosql.js');
const aModel = require('../model/answer_nosql.js');

module.exports = {
  
  answer: {
    get: (req, res) => {
      aModel.get(req.params.question_id, req.records, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.send(result);
        }
      });
    },
  
    post: (req, res) => {
      let data = req.body;
      data.date_written = req.requestDate;
      data.question_id = req.params.question_id;
      aModel.post(data, (err, result) => {
        if (err) { 
          res.sendStatus(400);
        } else {
          res.sendStatus(201);
        }
      });
    },
  
    helpful: (req, res) => {
      aModel.helpful(req.params.answer_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.sendStatus(204);
        }
      });
    },
  
    report: (req, res) => {
      aModel.report(req.params.answer_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.sendStatus(204);
        }
      }); 
    },

    delete: (req, res) => {
      aModel.delete(req.params.answer_id, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    }
  },


  question: {
    get: (req, res) => {
      qModel.get(req.params.product_id, req.records, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.send(result);
        }
      });   
    },
  
    post: (req, res) => {
      let data = req.body
      data.product_id = req.params.product_id;
      data.date_written = req.requestDate;
      qModel.post(data, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.sendStatus(201);
        }
      });
    },

    helpful: (req, res) => {
      qModel.helpful(req.params.question_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else { 
          res.sendStatus(204);
        }
      });
    },
  
    report: (req, res) => {
      qModel.report(req.params.question_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.sendStatus(204);
        }
      });
    },

    delete: (req, res) => {
      qModel.delete(req.params.question_id, (err, result) => {
        if (err) { res.sendStatus(400) }
        else {
          res.sendStatus(204);
        }
      });
    }
  
  }

}