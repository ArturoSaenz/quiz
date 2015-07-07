var models = require('../models/models.js');

//Autoload - factoriza  el codigo  si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
				}
				else { next(new Error('No existe quizId=' + quizId)); }
			}
		).catch(function(error){next(error);});
};

//GET /quizes Controlodor de index en vista views/quizes/index.ejs
exports.index = function(req, res){
  var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g,'%');

    if (req.query.search) {
  		  models.Quiz.findAll({
    			where: ["pregunta like ?", condicion],
    			order: [['pregunta', 'ASC']]}
    			).then(function(quizes) {
    			res.render('quizes/index.ejs', {quizes: quizes});
  		  }).catch(function(error) {next(error);});
	  }else{
      models.Quiz.findAll().then(
        function(quizes) {
        res.render('quizes/index.ejs', { quizes: quizes});
        }
      ).catch(function(error){ next(error); })
	  }
};

//GET /quizes/question antes de tener DB
//GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', { quiz : req.quiz });
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  var resultado = 'Incorrecto';
  if(req.query.respuesta.toUpperCase() === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado });
};