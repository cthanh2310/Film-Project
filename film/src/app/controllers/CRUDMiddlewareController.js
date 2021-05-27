var accounts = require('../models/accounts')
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const path = require('path')
var fs = require('fs');
// var publicKey = fs.readFileSync('.../key/domain.key');
var publicKey = fs.readFileSync(path.resolve('film/src/key/publickey.cr'));

class MiddlewareController {
    async requireAuthentication(req, res, next) {
        // console.log(req.cookies);
        try {
            const token = req.cookies.token;
            const result = jwt.verify(token, publicKey, { algorithms: ['RS256']});
            var account_temp = await accounts.findOne({ _id: result._id })
                .then(account => {
                    account = account.toObject();
                    return account;
                })
            if (!account_temp) {
                return res.redirect('/login');
            }
            if (result && account_temp.role) {
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