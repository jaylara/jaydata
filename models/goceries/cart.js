const mongoose = require('mongoose');

//represented as a collection of Carts in the DB.
const Cart = mongoose.model('GoceriesCart', new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GoceriesUser'
	},
	items: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GoceriesItem'
	}],
	itemsQty: [{
		type: Number,
		default: 1
	}],
	completed: {
		type: Boolean,
		default: false
	},
}));

module.exports = {
	Cart
}
