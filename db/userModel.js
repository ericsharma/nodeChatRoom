var mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
    username: String,
    password: String
  });

  nameSchema.methods.validPassword = function (password, cb) {
    return this.model('User').findOne(
            {
                username: this.username,
                password: password
            })

};

var User = mongoose.model("User", nameSchema)

mongoose.Promise =
global.Promise;mongoose.connect("mongodb://localhost:27017/user-app");

module.exports = User
