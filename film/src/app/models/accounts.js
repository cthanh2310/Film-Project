const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

// const slug = require('mongoose-slug-generator');

// mongoose.plugin(slug);

const Schema = mongoose.Schema;

const accounts = new Schema({
    fullname: { type: String, required: true, maxLength: 255 },
    email: { type: String, maxLength: 600, unique: true },
    password: { type: String, maxLength: 100 },
}, {
    timestamps: true,
});
// accounts.methods.encryptPassword = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// };
// accounts.methods.validPassword = function(password){

//         return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('accounts', accounts); // convert chữ thường, nhiều từ thì cách nhau bằng _, thêm thành dạng số nhiều 
