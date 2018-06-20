const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        required: true,
        unique: true,
        type: String,
    }
})

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password, cb) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)