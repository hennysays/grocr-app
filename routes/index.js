
/*
 * GET home page.
 */

exports.index = function(req, res){
	var indexPath;
	if(process.env.NODE_ENV == 'development' || typeof process.env.NODE_ENV == 'undefined') {
		res.render('index_dev');
		console.log("using development index.html");
	}
	else {
		res.render('index_prod');
		console.log("using production index.html");
	}
	
}; 