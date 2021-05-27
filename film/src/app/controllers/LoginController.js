const accounts = require('../models/accounts');
const jwt = require('jsonwebtoken');
const path = require('path')
var fs = require('fs');
// var privateKey = fs.readFileSync('.../key/domain.csr');
var privateKey = fs.readFileSync(path.resolve('film/src/key/private.pem'));

// const passport = require('passport')

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// },
//     function (username, password, done) {
//         accounts.findOne({ 
//             username: username,
//             password: password,
//         })
//         .then(data => {
//             if(!data) done(null, false)
//             done(null, data)
//         })
//         .catch(err => {
//             done(err);
//         })
//     }
// ));
class LoginController {
    store(req, res) {
        console.log('login store success!');
        accounts.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(data => {
                if (data) {
                    var token = jwt.sign({ _id: data._id }, privateKey, { algorithm: 'RS256' })
                    // res.clearCookie('token');
                    // res.cookie('token', token, { expires: new Date(Date.now() + 900000)});
                    // console.log(res.cookies.token);
                    return res.json({
                        message: 'OK!',
                        token: token
                    })
                } else {
                    return res.json('Login failed !')
                }
            })
            .catch(err => {
                res.status(500).json('Server error !')
            })
    }
    login(req, res) {

        // passport.authenticate('local', function (err, user) {
        //     if (err) { return next(err); }
        //     if (!user) { return res.redirect('/login'); }
        //     req.logIn(user, function (err) {
        //         if (err) { return next(err); }
        //         return res.redirect('/users/' + user.username);
        //     });
        // })(req, res, next);
        // console.log(req.session.email)

        res.clearCookie('token');

        res.render('login');
        console.log('login succes !')
    }

}
module.exports = new LoginController();