// GET /author
exports.author = function(req, res) {
   res.render('author', {encabezado: 'Bienvenidos a la sección del Autor'});
};