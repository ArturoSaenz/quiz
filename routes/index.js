var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quizController');
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author',authorController.author);

module.exports = router;
