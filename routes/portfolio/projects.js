const DB = require('../../utils/firebase').firebase.app().database();

//Selects one project by id from DB.projects
function selectProject(req, res, id) {
	var ref = DB.ref('/projects/'+id)//.orderByChild('id').equalTo(req.params.id);
	ref.once('value').then((data) => {
		var project = data.val();

		if(!project) 	res.json({"err":"this collection is empty"});
		else 			res.json(project);
	})
	.catch((error) => {
		res.status(500).json({error: error.message});
	});

} // end of selectProject()

//Selects one project by parameter id from DB.projects
function selectItem(req, res) {
	selectProject(req,res,req.params.id);
}//end of selectItem()

//Selects all projects from DB.projects or selects one by query pid
function selectAllItems(req, res) {
	if(req.query.pid)
		selectProject(req,res,req.query.pid);
	else{
		var ref = DB.ref('/projects')
		ref.once('value').then(function (data) {
			var projects = data.val();

			if(!projects) 	res.json({"err":"this collection is empty"});
			else 			res.json(projects);
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
