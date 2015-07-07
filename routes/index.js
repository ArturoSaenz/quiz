var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quizController');
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//Definicion de la rutas de quizes

router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);

router.get('/quizes/:quizId', quizController.show);
router.get('/quizes/:quizId/answer', quizController.answer);
router.get('/author',authorController.author);

module.exports = router;
