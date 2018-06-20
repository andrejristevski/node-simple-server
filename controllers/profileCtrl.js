const User = require('../models/User');

const getProfile = (req, res) => {

    User.findOne({ email: req.user.email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            res.status(400).send()
        }

        res.status(200).send(user);

    });
}


module.exports = {
    getProfile,
}