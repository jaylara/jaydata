'use strict';

const DB = require('../../models/goceries').Goceries;

//Selects one item by parameter id from specified DB.Item
function selectItem(req, res) {
	DB.Item.findOne({_id: req.params.id}, (err, fItem) => {
		res.json(fItem);
	});
}//end of selectItem()

//Selects items by parameter tags from specified DB.Item
function selectItemsByTag(req, res) {
	DB.Item.find({tags: req.params.tags}, (err, fItem) => {
		res.json(fItem);
	});
}//end of selectItem()

//Selects all items from specified DB.Item
function selectAllItems(req, res) {
	DB.Item.find().collation({locale:'en',strength: 2}).sort({name:1})
		.exec((err, items) => { // send all items as JSON response
		if (err) { return console.log("index error: " + err); }
		res.json(items);
	});

	// DB.Item.find((err, items) => { // send all items as JSON response
	// 	if (err) { return console.log("index error: " + err); }
	// 	res.json(items);
	// });
}//end of selectAllItems()

//Selects all item tags from specified DB.Item
function selectAllItemTags(req, res) {
	DB.Item.distinct('tags',(err, items) => { // send all items as JSON response
		if (err) { return console.log("index error: " + err); }
		res.json(items);
	});
}//end of selectAllItems()

//Creates a simple item. create item into the specified DB.Item
function createItem(req, res) {
	(new DB.Item(req.body)).save((err, newItem) => {
		res.json(newItem);
	});
}//end of createItem()


//Updates one item by parameter id from specified DB.Item
function updateItem(req, res) {

    function GetObjectFromKeyValuePairs(pairs) {
        var tmp = {};

        for(var key in pairs)
            if(key[0] !== "_")
                if(pairs[key].length !== 0)
                    tmp[`${key}`] = `${pairs[key]}`;
        return tmp;
    }
    let updateOnlyChangedVals = GetObjectFromKeyValuePairs(req.body);

	DB.Item.update({_id: req.params.id}, {$set: updateOnlyChangedVals}, {new:true}, (err, uItem) => {
		if (err) { return console.log("index error: " + err); }
		res.json(uItem);
	});
}//end of updateItem()

//Deletes one item by parameter id from specified DB.Item
function deleteItem(req, res) {
	DB.Item.findOneAndRemove({ _id: req.params.id }).exec((err, dItem) => {
		res.json(dItem);
	});
}//end of deleteItem()


function check_user(req, res, next) {
    if (req.session.userId === undefined) {
        return res.json('You do not have permission to access this url.');
    }
    next();
}


//exporting common, simple CRUD methods for use by other routes
module.exports = {
	selectAllItems,
	selectItem,
	createItem,
	updateItem,
	deleteItem,
	selectItemsByTag,
	selectAllItemTags,
    check_user
};
