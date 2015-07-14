var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quizController');
var authorController = require('../controllers/author_controller');
//Modulo 9
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', 						quizController.load); //autoload :quizId
router.param('commentId', 					commentController.load); //autoload :commentId

//Definicion de la rutas de /session
router.get('/login',						sessionController.new); //formulario login
router.post('/login', 						sessionController.create); //crear sesion
router.get('/logout',						sessionController.destroy); //destruir sesion


//Definicion de la rutas de /quizes

router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);


//Modulo 9 Autorización, varios MWs en serie: “get(‘/quizes/new’, MW1, MW2)”
//Añadir en routes/index.js la ruta GET /quizes/new Modulo 8
router.get('/quizes/new', 					sessionController.loginRequired, quizController.new);
router.post('/quizes/create', 				sessionController.loginRequired, quizController.create);

//GET /quizes/:quizId/edit accede al formulario de edición de preguntas.
router.get('/quizes/:quizId(\\d+)/edit', 	sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.update);

//borrar pregunta en DB Modulo 8
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.destroy);

//Definicion de las rutas de los comentarios
//Modulo 9, GET /quizes/:quizId/edit accede al formulario de edición de preguntas.
router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

router.get('/quizes/statistics', sessionController.loginRequired, statisticsController.statistics);

//Definicion de la ruta de author
router.get('/author',						authorController.author);

module.exports = router;