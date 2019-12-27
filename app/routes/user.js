const router = require("express").Router();

const passport = require('../../config/passport');

const userController = require("../controller/user");
const homeController = require("../controller/home");

router.get('/', userController.verify, userController.index);

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/login',
	failureFlash: true
}), homeController.successfulLogin);

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/signup',
	failureFlash: true
}), homeController.successfulSignup);

router.get('/list', userController.list);
router.post('/show', userController.show);
router.post('/updateInfo', userController.updateInfo);
router.post('/updatePassword', userController.updatePassword);

module.exports = router;