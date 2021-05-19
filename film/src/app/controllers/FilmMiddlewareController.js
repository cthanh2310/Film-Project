var accounts = require('../models/accounts')
const jwt = require('jsonwebtoken');
const path = require('path')
var fs = require('fs');
var publicKey = fs.readFileSync(path.resolve('film/src/key/publickey.cr'));
class MiddlewareController {
    requireAuthentication(req, res, next) {
        // console.log(req.cookies);
        try {
            const token = req.cookies.token;
            const result = jwt.verify(token, publicKey, { algorithms: ['RS256']});
            const account = accounts.find({ _id: result._id });
            if (!account) {
                return res.redirect('/login');
            }
            if (result) {
                next();
            }
        } catch (error) {
            res.redirect('/login');
        }


        // if(!req.cookies.email){
        //     res.redirect('/login');
        //     return;
        // }
        // const account = accounts.find({email: req.cookies.email});
        // if(!account){
        //     res.redirect('/login')
        //     return;
        // }
        // next();
    }

}
module.exports = new MiddlewareController();