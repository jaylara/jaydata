const DB = require('../../utils/firebase').firebase.app().database();

//Selects one blurb by id from DB.blurbs
function selectBlurb(req, res, id) {
	var ref = DB.ref('/blurbs/'+id)//.orderByChild('id').equalTo(req.params.id);
	ref.once('value').then((data) => {
		var blurb = data.val();

		if(!blurb) 	res.json({"err":"this collection is empty"});
		else 			res.json(blurb);
	})
	.catch((error) => {
		res.status(500).json({error: error.message});
	});

} // end of selectBlurb()

//Selects one blurb by parameter id from DB.blurbs
function selectItem(req, res) {
	selectBlurb(req,res,req.params.id);
}//end of selectItem()

//Selects all blurbs from DB.blurbs or selects one by query bid
function selectAllItems(req, res) {
	if(req.query.bid)
		selectBlurb(req,res,req.query.bid);
	else{
		var ref = DB.ref('/blurbs')
		ref.once('value').then(function (data) {
			var blurbs = data.val();

			if(!blurbs) 	res.json({"err":"this collection is empty"});
			else 			res.json(blurbs);
		})
		.catch((error) => {
			res.status(500).json({error: error.message});
		});
	}
}//end of selectAllItems()

//exporting CRUD methods for use by other routes
module.exports = {
	selectAllItems,
	selectItem
};
