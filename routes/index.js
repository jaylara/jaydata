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


//CAH Routes
const cahRoute = require('./cah/index');

router.route('/cah')
    .get(cahRoute.getCardSets);
router.route('/cah/draw')
    .get(cahRoute.drawCards);

//Goceries Routes
const goceriesRoute = {
    carts : require('./goceries/carts'),
    items : require('./goceries/items'),
    accounts : require('./goceries/accounts'),
    homes : require('./goceries/homeAccounts')
}

// Item API Routes
router.route('/goceries/items')
    .get(goceriesRoute.items.selectAllItems)
    .post(goceriesRoute.items.check_user, goceriesRoute.items.createItem);
router.route('/goceries/items/tags')
	.get(goceriesRoute.items.selectAllItemTags);
router.route('/goceries/items/:id')
    .get(goceriesRoute.items.selectItem)
    .put(goceriesRoute.items.check_user, goceriesRoute.items.updateItem)
    .delete(goceriesRoute.items.check_user, goceriesRoute.items.deleteItem);
router.route('/goceries/items/tags/:tags')
    .get(goceriesRoute.items.selectItemsByTag);

// Cart API Routes
router.route('/goceries/carts')
    .get(goceriesRoute.carts.selectAllCarts)
    .post(goceriesRoute.items.check_user, goceriesRoute.carts.createCart);
router.route('/goceries/carts/:id')
    .get(goceriesRoute.carts.selectCart)
    .put(goceriesRoute.items.check_user, goceriesRoute.carts.updateCart)
    .delete(goceriesRoute.items.check_user, goceriesRoute.carts.deleteCart);
router.route('/goceries/carts/open/:user_id')
    .get(goceriesRoute.carts.selectOpenCartByUserId);
router.route('/goceries/carts/closed/:user_id')
	.get(goceriesRoute.carts.selectClosedCartsByUserId);

// Admin Page Security Routes
router.route('/sessions')
    .post(goceriesRoute.accounts.newLoginSession);

// Disallow Creating an admit account, uncomment to create an account
router.route('/admin/panel')
    .get(goceriesRoute.accounts.getProfilePage);
router.route('/admin/login')
    .get(goceriesRoute.accounts.getLoginPage);
router.route('/admin/logout')
    .get(goceriesRoute.accounts.getLogoutPage);

// Home Page Authentication
router.route('/home/sessions')
    .post(goceriesRoute.homes.newLoginSession);
router.route('/home/users')
    .post(goceriesRoute.homes.registerNewUser);
router.route('/home/panel')
    .get(goceriesRoute.homes.getProfilePage);
router.route('/home/login')
    .get(goceriesRoute.homes.getLoginPage);
router.route('/home/logout')
    .get(goceriesRoute.homes.getLogoutPage);

module.exports = router;
