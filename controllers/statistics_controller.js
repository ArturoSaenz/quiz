var models = require('../models/models.js');

// GET /quizes/:quizId(\\d+)/comments/new
exports.statistics = function (req,res){

	var estadisticas = {
		numeroPreguntas: 0,
		numeroComentarios: 0,
		preguntasConComentarios: 0
	};

	var errors = [];

	models.Quiz.count()
	.then(function(preguntas){

		estadisticas.numeroPreguntas = preguntas;
		return models.Comment.count();

	}).then(function(comentarios){

		estadisticas.numeroComentarios = comentarios;
		return models.Comment.contadorPregComentadas();

	}).then(function(comentadas){

		estadisticas.preguntasConComentarios = comentadas;

	}).catch(function(err){

		errors.push(err);

	}).finally(function(){

		res.render('statistics/statistics', {estadisticas: estadisticas, errors: errors});

	});
};