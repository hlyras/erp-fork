const router = require("express").Router();
const lib = require('../../config/lib');

const passport = require('../../config/passport');

const userController = require("../controller/user");
const homeController = require("../controller/home");

router.get('/', lib.routeToHttps, userController.verify, userController.index);

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/login',
	failureFlash: true
}), homeController.successfulLogin);

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/signup',
	failureFlash: true
}), homeController.successfulSignup);

router.get('/list', lib.routeToHttps, userController.list);
router.post('/show', lib.routeToHttps, userController.show);
router.put('/updateInfo', lib.routeToHttps, userController.updateInfo);
router.put('/updatePassword', lib.routeToHttps, userController.updatePassword);

module.exports = router;