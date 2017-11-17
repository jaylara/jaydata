const mongoose = require('mongoose');

//represented as a collection of Items in the DB.
const Item = mongoose.model('GoceriesItem', new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		default: 0,
		required: true
	},
	tags: {
		type: String,
		required: true
	}
}));

module.exports = {
	Item
}
