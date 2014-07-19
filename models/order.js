var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
		user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
		basket           : [{
	        name: String,
	        description: String,
	        savings: String,
	        price: String,
	        units: String,
	        unitPrice: Number,
	        date: Number,
	        category: Number,
	        quantity: Number,
    	}],
    	orderID: Number,
    	date: Date,
    	orderProcessed: Boolean,
    	memo: String,
	});

module.exports = mongoose.model('Order', orderSchema);
