const express = require('express');
const router = express.Router();
const answer = require('../controller').answer;
const question = require('../controller').question;


// answer routes
router.get('/:question_id/answers', answer.get);

router.post('/:question_id/answers', answer.post);

router.put('/answer/:answer_id/helpful', answer.helpful);

router.put('/answer/:answer_id/report', answer.report);



// question routes
router.get('/:product_id', question.get);

router.post('/:product_id', question.post);

router.put ('/question/:question_id/helpful', question.helpful);

router.put('/question/:question_id/report', question.report);



module.exports = router;