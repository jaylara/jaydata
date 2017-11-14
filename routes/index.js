const router = require('express').Router();

//profolio Routes
const portfolioRoute = {
    blurbs : require('./portfolio/blurbs'),
    projects : require('./portfolio/projects')
}

// Portfolio Blurb API Routes
router.route('/portfolio/blurbs')
    .get(portfolioRoute.blurbs.selectAllItems);
    //.post(itemRoute.check_user, itemRoute.createItem);

router.route('/portfolio/blurbs/:id')
    .get(portfolioRoute.blurbs.selectItem);

// Portfolio Project API Routes
router.route('/portfolio/projects')
    .get(portfolioRoute.projects.selectAllItems);

router.route('/portfolio/projects/:id')
    .get(portfolioRoute.projects.selectItem);


//Yelp Route
const yelpproxyRoute = require('./yelpproxy/index');

router.route('/yelpproxy/search')
    .get(yelpproxyRoute.search);

router.route('/yelpproxy/phone')
    .get(yelpproxyRoute.searchByPhone);

router.route('/yelpproxy/reviews')
    .get(yelpproxyRoute.searchForReviews);

router.route('/yelpproxy/autocomplete')
    .get(yelpproxyRoute.autocomplete);

module.exports = router;
