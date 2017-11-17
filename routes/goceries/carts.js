const DB = require('../../models/goceries');

//Selects one cart by parameter id from specified DB.Cart
function selectCart(req, res) {
	DB.Cart.findOne({_id: req.params.id})
	.populate('items')
	.exec((err, fCart) => {
		res.json(fCart);
	});
}//end of selectCart()

//Selects one open (incomplete) cart by parameter user._id from specified DB.Cart
function selectOpenCartByUserId(req, res) {
	DB.Cart.findOne({'user': req.params.user_id,completed:false})
	.populate('items')
	.exec( (err, fCart) => {
		res.json(fCart);
	});
}//end of selectOpenCartByUserId()

//Selects one open (incomplete) cart by parameter user._id from specified DB.Cart
function selectClosedCartsByUserId(req, res) {
	DB.Cart.find({'user': req.params.user_id,completed:true})
	.populate('items')
	.exec( (err, fCart) => {
		res.json(fCart);
	});
}//end of selectOpenCartByUserId()

//Selects all carts from specified DB.Cart
function selectAllCarts(req, res) {
	DB.Cart.find()
	.populate('items')
	.exec((err, carts) => { // send all users as JSON response
		if (err) { return console.log("index error: " + err); }
		res.json(carts);
	});
}//end of selectAllCarts()

//Creates a simple cart. create cart into the specified DB.Cart
function createCart(req, res) {
	(new DB.Cart(req.body)).save((err, newCart) => {
		res.json(newCart);
	});
}//end of createCart()

//Updates one cart by parameter id from specified DB.Cart
function updateCart(req, res) {
	DB.Cart.update({_id: req.params.id}, {$set: req.body}, {new:true}, (err, uCart) => {
		if (err) { return console.log("index error: " + err); }
		res.json(uCart);
	});
}//end of updateCart()

//Deletes one cart by parameter id from specified DB.Cart
function deleteCart(req, res) {
	DB.Cart.findOneAndRemove({ _id: req.params.id }).exec((err, dCart) => {
		res.json(dCart);
	});
}//end of deleteCart()

module.exports = {
	selectAllCarts,
	selectCart,
	createCart,
	updateCart,
	deleteCart,
	selectOpenCartByUserId,
	selectClosedCartsByUserId
};
