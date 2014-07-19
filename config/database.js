module.exports = {
	//Here we find an appropriate database to connect to, defaulting to
	//localhost if we don't find one.
	'url' : process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'
};