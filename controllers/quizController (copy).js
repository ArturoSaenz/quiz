var models = require('../models/models.js');

//Autoload - factoriza  el codigo  si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
  models.Quiz.find(
  {
    where: {id: Number(quizId)},
    include: [{model: models.Comment }]
  }).then(
    function(quiz){
      if(quiz){
        req.quiz=quiz;
        next();
      } else {next(new Error('No existe el quizId: '+quizId));}
    }
  ).catch (function(error){next(error);});
};

//GET /quizes Controlador de index en vista views/quizes/index.ejs
exports.index = function(req, res){
  var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g,'%');

    if (req.query.search) {
  		  models.Quiz.findAll({
    			     where: ["pregunta like ?", condicion],
    			     order: [['pregunta', 'ASC']]}
    			).then(function(quizes) {
    			res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
  		  }).catch(function(error) { next(error); });
	  }else{
      models.Quiz.findAll().then(
        function(quizes) {
        	res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
        }
      ).catch(function(error){ next(error); })
	  }
};

//GET /quizes/show
exports.show = function(req, res) {
	res.render('quizes/show', { quiz : req.quiz, errors: []});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  var resultado = 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: [] });
};


// Añadir formulario de creación de preguntas en GET /quizes/new (acción new asociada a la ruta /quizes/new)
exports.new = function (req,res){
  var quiz = models.Quiz.build( //crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};

//Añadir POST /quizes/create para añadir preguntas a DB --> Añadir controlador create a quiz_controller.js
exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz );

  quiz
    .validate()
    .then(
        function(err){
          if(err) {
            res.render('quizes/new', { quiz: quiz, errors: err.errors });
          }else {
            quiz //save: Guarda en DB los campos pregunta y respuesta de quiz
             .save( { fields: ["pregunta" , "respuesta", "tema"] } )
             .then( function(){ res.redirect('/quizes') } )
          }   // res.redirect: Redireccion HTTP lista de preguntas
      }
    );
};

//GET /quizes/:id/edit
exports.edit = function(req, res){
  var quiz = req.quiz; //autoload instancia de quiz

  res.render('/quizes/edit', { quiz : quiz, errors: []});
};

//PUT /quizes/:id
exports.update = function(req, res) {
  res.quiz.pregunta = req.body.quiz.pregunta;
  res.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz
    .validate()
    .then(
        function(err){
          if(err) {
            res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
          }else {
            quiz //save: Guarda en DB los campos pregunta y respuesta de quiz
             .save( { fields: ["pregunta" , "respuesta", "tema"] } )
             .then (function(){ res.redirect('/quizes')})
          }   // res.redirect: Redireccion HTTP lista de preguntas
      }
    );
};

// DELETE /quizes/:quizId borra la pregunta identificada por :quizId en la base de datos.
exports.destroy = function (req, res){
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch(function (error){next(error)});
};