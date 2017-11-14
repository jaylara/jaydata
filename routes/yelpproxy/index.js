const yelp = require('yelp-fusion');

//get access token using a promise
const yelpClientPromise = yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
	.then(res => {
		return yelp.client(res.jsonBody.access_token);
	}).catch(e => {
		console.log(e);
		res.status(500).send('Could not get Yelp Access Token');
	});

//executes handling of a promise. responds with successful data output
// or error message in json
var handleClientAction = (res, promise) => {
	promise.then(response => {
			res.json(response.jsonBody);
	}).catch(e => {
			res.json(e);
	});
}//end of handleClientAction()

//Simple search. handles query strings.
//simplest query requires value for [location] or [latitude]+[longitude] values.
function search(req, res) {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.search(req.query));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
}//end of search()

//Phone search. handles query strings.
//simplest query needs value for [phone] value (ex: +14157492060).
function searchByPhone(req, res) {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.phoneSearch(req.query));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
}//end of searchByPhone()

//TODO: needs some work. https://www.yelp.com/developers/documentation/v3/business_reviews
//reviews search. handles query strings.
//simplest query needs value for [term] value (ex: ).
function searchForReviews(req, res) {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.reviews(req.query.term));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
}//end of searchForReviews()

//autocomplete search. handles query strings.
//simplest query requires value for [text] value (ex: pizza).
function autocomplete(req, res) {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.autocomplete(req.query.text));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
}//end of autocomplete()

module.exports = {
    search,
    searchByPhone,
    searchForReviews,
    autocomplete
}
