const database = require('../../utils/firebase').firebase;

//Selects one item by parameter id from specified DB.Item
function selectItem(req, res) {
	//.orderByChild('theme').equalTo("orange")
	var ref = database.app().database().ref('/projects/'+req.params.id);
	ref.once('value').then(function (data) {
	    res.json(data.val());
	});
}//end of selectItem()

//Selects all items from specified DB.Item
function selectAllItems(req, res) {
	var ref = database.app().database().ref('/projects')
	ref.once('value').then(function (data) {
		var projects = data.val();

		if(!projects) 	res.json({"err":"this collection is empty"});
		else 			res.json(projects);
	});
}//end of selectAllItems()

//exporting common, simple CRUD methods for use by other routes
module.exports = {
	selectAllItems,
	selectItem
};
