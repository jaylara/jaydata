const database = require('../../utils/firebase').firebase;

//Selects one item by parameter id from specified DB.Item
function selectItem(req, res) {
	var ref = database.app().database().ref();
	ref.once('value').then(function (data) {
	    res.json(data.val().projects);
	});
}//end of selectItem()

//Selects all items from specified DB.Item
function selectAllItems(req, res) {
	var ref = database.app().database().ref();
	ref.once('value').then(function (data) {
		var projects = data.val().projects;

		if(!projects) 	res.json({"err":"this collection is empty"});
		else 			res.json(projects);
	});
}//end of selectAllItems()

//exporting common, simple CRUD methods for use by other routes
module.exports = {
	selectAllItems,
	selectItem
};
