const router = require('express').Router();

//routes
const portfolioRoute = {
    blurbs : require('./portfolio/blurbs'),
    projects : require('./portfolio/projects')
}

// Blurb API Routes
router.route('/portfolio/blurbs')
    .get(portfolioRoute.blurbs.selectAllItems);
    //.post(itemRoute.check_user, itemRoute.createItem);

router.route('/portfolio/blurbs/:id')
    .get(portfolioRoute.blurbs.selectItem);

// Project API Routes
router.route('/portfolio/projects')
    .get(portfolioRoute.projects.selectAllItems);

router.route('/portfolio/projects/:id')
    .get(portfolioRoute.projects.selectItem);

module.exports = router;
