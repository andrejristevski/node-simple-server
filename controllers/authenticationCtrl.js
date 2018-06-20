const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const signup = (req, res, next) => {
    const userBody = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }
    User.create(userBody, (err, user) => {
        if (err) {
            return res.status(400).send('some err')
        }
        let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(201).send({ userId: user.id, token });
    })
}

const login = (req, res, next) => {
    const passwordIsValid = bcrypt.compareSync(req.body.password, req.user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    let token = jwt.sign({ id: req.user._id }, process.env.SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ id: req.user.id, token });
}


module.exports = {
    signup,
    login,
}