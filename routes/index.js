var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quizController');
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//Definicion de la rutas de /quizes

router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);

//Añadir en routes/index.js la ruta GET /quizes/new Modulo 8
router.get('/quizes/new', 					quizController.new);

router.post('/quizes/create', 				quizController.create);

//GET /quizes/:quizId/edit accede al formulario de edición de preguntas.
router.get('/quizes/:quizId(\\d+)/edit', 	quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		quizController.update);

//borrar pregunta en DB Modulo 8
router.delete('/quizes/:quizId(\\d+)', 		quizController.destroy);

//Definicion de la ruta de author
router.get('/author',						authorController.author);

module.exports = router;
