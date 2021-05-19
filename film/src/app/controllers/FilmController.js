
const accounts = require('../models/accounts');
const films = require('../models/films');
const jwt = require('jsonwebtoken');
const path = require('path')
var fs = require('fs');
// var publicKey = fs.readFileSync('.../key/domain.key');
var publicKey = fs.readFileSync(path.resolve('film/src/key/publickey.cr'));

class FilmController {
    async film(req, res, next) {
        // res.send('HELLo')
        // accounts.findOne({email: req.cookies.email})
        // .then((account) => {
        //         res.render('film', {account: mongooseToObject(account)});
        //     })
        //     .catch(next);
        const token = req.cookies.token;
        const result = jwt.verify(token, publicKey, { algorithms: ['RS256']});
        var listfilm_temp = await films.find({}).sort( [['_id', -1]] )
            .then(listfilm => {
                listfilm = listfilm.map(film => film.toObject())
                return listfilm;
            })
        var account_temp = await accounts.findOne({ _id: result._id })
            .then(account => {
                account = account.toObject();
                return account;
            })
        var count = await films.countDocuments({});
        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        // var start = (page - 1) * perPage;
        // var end = page * perPage;
        var totalPage = await(Math.ceil(count/perPage));
        res.render('film', { listfilm: listfilm_temp.slice(start, end), account: account_temp, totalPage: totalPage });

        // accounts.findOne({ _id: result._id }, (err, result) => {
        //     // console.log(req.session.email)
        //     res.render('film', { account: mongooseToObject(result) })
        // })
        // console.log(account);
        // })
        // const listfilm = films.find({}, (err, result) =>{
        //     if (err){
        //         return err
        //     } else if(result){
        //         return result
        //     } else {
        //         return null
        //     }

        // })


        //     .catch(err => {
        //         console.log(err)
        //     })

        // const films = films.find({}, (err, result) =>{
        //     if(err) throw err;
        //     return films;
        // });

    }
    film_Post(req, res) {


        var page = parseInt(req.query.page) || 1;
        var perPage = 8;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        films.find({}).sort( [['_id', -1]] )
            .then(async listfilm => {
                listfilm = listfilm.map(film => film.toObject())
                return res.json(listfilm.slice(start, end));
            })
    }
}

module.exports = new FilmController();