const express = require('express')
const router = express.Router()
const passport = require('passport');

const authController = require('../controllers/authenticationCtrl');
const profileController = require('../controllers/profileCtrl');

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.get('/alive', (req, res) => {
    res.status(200).send('Alive');
});

router.post('/register', authController.signup)

router.post('/login', passport.authenticate('local', { session: false }), authController.login)
router.get('/profile', passport.authenticate('jwt', { session: false }), profileController.getProfile)


module.exports = router;