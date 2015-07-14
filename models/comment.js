//Definicion del modelo de Quiz

module.exports = function (sequelize, DataTypes){
	return sequelize.define('Comment',
							{
								texto: {
									type: DataTypes.STRING,
									validate: { notEmpty: {msg: "-> Falta comentario"}}
								},
								publicado: {
									type: DataTypes.BOOLEAN,
									defaultValue: false
								}
							},
							{
								classMethods: {
									contadorPregComentadas: function(){
										return this.aggregate('QuizId', 'count', {distinct: true});
									}
								}
							}
		);
}