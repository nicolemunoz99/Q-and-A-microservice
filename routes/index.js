const express = require('express');
const router = express.Router();
const answer = require('../controller').answer;
const question = require('../controller').question;

// all GET requests (handle query params)
router.get('/*', (req, res, next) => {
  let pageNum = req.query.page === undefined ? 1 : Number(req.query.page);
  let limit = req.query.count === undefined ? 5 : Number(req.query.count);
  let offset = limit * (pageNum - 1);
  req.records = { limit, offset, page: limit * (pageNum - 1)};
  next();
});

// answer routes
router.get('/:question_id/answers', answer.get);

router.post('/:question_id/answers', answer.post);

router.put('/answer/:answer_id/helpful', answer.helpful);

router.put('/answer/:answer_id/report', answer.report);

router.delete('/answer/:answer_id', answer.delete);


// question routes
router.get('/:product_id', question.get);

router.post('/:product_id', question.post);

router.put ('/question/:question_id/helpful', question.helpful);

router.put('/question/:question_id/report', question.report);

router.delete('/question/:question_id', question.delete);

module.exports = router;